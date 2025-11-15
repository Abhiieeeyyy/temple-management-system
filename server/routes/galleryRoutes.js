import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Gallery from '../models/Gallery.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/gallery'));
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
      mimetype: file.mimetype,
      size: file.size
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
    const { title, description, category } = req.body;
    const mediaUrl = `/uploads/gallery/${req.file.filename}`;
    const mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';
    
    console.log('Media upload:', {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      mediaType: mediaType,
      title: title
    })

    const galleryItem = new Gallery({
      title,
      description,
      category: category || 'general',
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
      const mediaUrl = `/uploads/gallery/${file.filename}`;
      const mediaType = file.mimetype.startsWith('image') ? 'image' : 'video';
      
      console.log('Processing file:', {
        filename: file.filename,
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
    // TODO: Also delete the file from the filesystem
    await galleryItem.deleteOne();
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router; 