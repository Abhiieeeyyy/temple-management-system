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

// Configure multer for file upload (saves directly in memory)
const storage = multer.memoryStorage();

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
    fileSize: 15 * 1024 * 1024 // 15MB limit to prevent exceeding MongoDB's 16MB document limit
  }
});

// Upload a new media item (no authentication required)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const { title, description, category, size } = req.body;
    
    // Convert to Base64 to store directly in MongoDB
    console.log('Converting file to Base64...');
    const base64Data = req.file.buffer.toString('base64');
    const mediaUrl = `data:${req.file.mimetype};base64,${base64Data}`;
    const mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';

    console.log('Media upload item database record creation:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      mediaType: mediaType,
      title: title,
      size: size || 'normal'
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
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    const { title, category } = req.body;
    const uploadedItems = [];

    console.log('Multiple file upload:', {
      fileCount: req.files.length,
      title: title,
      category: category
    })

    for (const file of req.files) {
      console.log(`Converting file ${file.originalname} to Base64...`);
      const base64Data = file.buffer.toString('base64');
      const mediaUrl = `data:${file.mimetype};base64,${base64Data}`;
      const mediaType = file.mimetype.startsWith('image') ? 'image' : 'video';

      console.log('Processing file db record:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        mediaType: mediaType
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
      if (galleryItem.mediaUrl.startsWith('data:')) {
        // Skip deleting files for Base64 database-stored data
        console.log('✅ Skipping file deletion for database Base64 stored item');
      } else if (galleryItem.mediaUrl.startsWith('http://') || galleryItem.mediaUrl.startsWith('https://')) {
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