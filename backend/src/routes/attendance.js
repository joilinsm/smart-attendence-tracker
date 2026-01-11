const express = require('express');
const multer = require('multer');
const db = require('../db');

const upload = multer({ dest: '/tmp/uploads' });
const router = express.Router();

// Create attendance record (photo optional) - devices will upload photo and metadata
router.post('/', upload.single('photo'), async (req, res) => {
  const { user_id, timestamp, latitude, longitude, device_id } = req.body;
  const photoPath = req.file ? req.file.path : null;

  // TODO: upload photo to Supabase/Storage and enqueue background recognition job

  const result = await db.query(
    'INSERT INTO attendance(user_id,timestamp,latitude,longitude,photo_url,recognition_status,device_id) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id',
    [user_id, timestamp, latitude, longitude, null, 'pending', device_id]
  );

  res.json({ id: result.rows[0].id, recognition_status: 'pending' });
});

module.exports = router;
