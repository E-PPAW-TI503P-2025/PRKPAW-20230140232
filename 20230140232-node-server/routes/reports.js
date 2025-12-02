const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/permissionMiddleware');

// Endpoint daily report harus:
// 1. cek JWT
// 2. cek role admin

router.get('/daily',verifyToken, reportController.getDailyReport);

module.exports = router;
