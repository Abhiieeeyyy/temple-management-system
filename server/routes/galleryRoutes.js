import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import Gallery from '../models/Gallery.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists recursively
const uploadDir = path.join(__dirname, '../public/uploads/gallery');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Cloudinary if credentials are provided in environment
const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && 
                              process.env.CLOUDINARY_API_KEY && 
                              process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('☁️  Cloudinary integration configured for media uploads.');
} else {
  console.warn('⚠️  Cloudinary environment variables missing. Falling back to local ephemeral storage.');
}

// Configure multer for file upload (saves temporarily on disk first)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('File upload attempt:', {
      originalname: file.originalname,
      mimetype: file.mimetype
    })

    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|wmv|webm|mkv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/');

    if (extname && mimetype) {
      console.log('File accepted:', file.originalname)
      return cb(null, true);
    }
    console.log('File rejected:', file.originalname, 'Type:', file.mimetype)
    cb(new Error('Only image and video files are allowed!'));
  },
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit for videos
  }
});

// Upload a new media item (no authentication required)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, size } = req.body;
    let mediaUrl = `/uploads/gallery/${req.file.filename}`;
    const mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';

    // If Cloudinary is configured, upload the temporary file to Cloudinary
    if (isCloudinaryConfigured) {
      try {
        console.log('☁️ Uploading file to Cloudinary...');
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'temple-gallery',
          resource_type: 'auto'
        });
        mediaUrl = result.secure_url;
        
        // Clean up temporary local file
        fs.unlinkSync(req.file.path);
        console.log('✅ Uploaded to Cloudinary successfully. URL:', mediaUrl);
      } catch (uploadError) {
        console.error('❌ Cloudinary upload failed, falling back to local file storage:', uploadError.message);
        // Fallback is active, local file remains in server/public/uploads/gallery
      }
    }

    console.log('Media upload item database record creation:', {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      mediaType: mediaType,
      title: title,
      size: size || 'normal',
      mediaUrl: mediaUrl
    })

    const galleryItem = new Gallery({
      title,
      description,
      category: category || 'general',
      size: size || 'normal',
      mediaUrl,
      mediaType,
      uploadedBy: null // No user authentication
    });

    await galleryItem.save();
    res.status(201).json({ success: true, galleryItem });
  } catch (error) {
    console.error('Upload error:', error)
    res.status(400).json({ success: false, message: error.message });
  }
});

// Upload multiple files endpoint for admin panel
router.post('/upload', upload.array('files'), async (req, res) => {
  try {
    const { title, category } = req.body;
    const uploadedItems = [];

    console.log('Multiple file upload:', {
      fileCount: req.files.length,
      title: title,
      category: category
    })

    for (const file of req.files) {
      let mediaUrl = `/uploads/gallery/${file.filename}`;
      const mediaType = file.mimetype.startsWith('image') ? 'image' : 'video';

      // If Cloudinary is configured, upload the temporary file to Cloudinary
      if (isCloudinaryConfigured) {
        try {
          console.log(`☁️ Uploading ${file.filename} to Cloudinary...`);
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'temple-gallery',
            resource_type: 'auto'
          });
          mediaUrl = result.secure_url;
          
          // Clean up temporary local file
          fs.unlinkSync(file.path);
          console.log('✅ Uploaded to Cloudinary successfully. URL:', mediaUrl);
        } catch (uploadError) {
          console.error(`❌ Cloudinary upload failed for ${file.filename}, falling back to local storage:`, uploadError.message);
        }
      }

      console.log('Processing file db record:', {
        filename: file.filename,
        mimetype: file.mimetype,
        mediaType: mediaType,
        mediaUrl: mediaUrl
      })

      const galleryItem = new Gallery({
        title: title || `Uploaded ${mediaType}`,
        description: `Uploaded on ${new Date().toLocaleDateString()}`,
        category: category || 'General',
        mediaUrl,
        mediaType,
        uploadedBy: null
      });

      await galleryItem.save();
      uploadedItems.push(galleryItem);
    }

    console.log('Upload complete:', uploadedItems.length, 'items saved')
    res.status(201).json({ success: true, items: uploadedItems, message: `${uploadedItems.length} files uploaded successfully` });
  } catch (error) {
    console.error('Multiple upload error:', error)
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, photos: galleryItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete a gallery item (no authentication required)
router.delete('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    // Attempt to delete physical file from storage
    if (galleryItem.mediaUrl) {
      if (galleryItem.mediaUrl.startsWith('http://') || galleryItem.mediaUrl.startsWith('https://')) {
        // Cloudinary URL: Delete from Cloudinary
        if (isCloudinaryConfigured) {
          try {
            const parts = galleryItem.mediaUrl.split('/');
            const uploadIndex = parts.indexOf('upload');
            if (uploadIndex !== -1) {
              const remainingParts = parts.slice(uploadIndex + 1);
              // Check if the next segment is a version parameter (e.g., v12345678)
              if (remainingParts.length > 1 && /^v\d+$/.test(remainingParts[0])) {
                remainingParts.shift();
              }
              const folderAndFile = remainingParts.join('/');
              const publicId = folderAndFile.substring(0, folderAndFile.lastIndexOf('.'));
              
              console.log('☁️ Deleting resource from Cloudinary:', publicId);
              await cloudinary.uploader.destroy(publicId, { resource_type: galleryItem.mediaType });
              console.log('✅ Deleted from Cloudinary successfully.');
            }
          } catch (deleteError) {
            console.error('❌ Failed to delete from Cloudinary:', deleteError.message);
          }
        }
      } else {
        // Local path: Delete local file
        const localPath = path.join(__dirname, '../public', galleryItem.mediaUrl);
        if (fs.existsSync(localPath)) {
          fs.unlinkSync(localPath);
          console.log('✅ Deleted local file:', localPath);
        }
      }
    }

    await galleryItem.deleteOne();
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;