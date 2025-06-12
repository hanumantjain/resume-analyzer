const express = require('express');
const router = express.Router();
const upload = require('../config/storage');
const { uploadResume } = require('../controllers/uploadController');

router.post('/', upload.single('resume'), uploadResume);

module.exports = router;

