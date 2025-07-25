import express from 'express';
import upload from '../utils/multer.js';

const router = express.Router();

// POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({ imageUrl: req.file.path }); // URL from Cloudinary
  } catch (err) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

export default router;
