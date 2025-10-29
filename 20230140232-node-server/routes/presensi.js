const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { addUserData } = require('../middleware/permissionMiddleware');

router.use(addUserData);

// Endpoint check-in dan check-out
router.post('/check-in', presensiController.CheckIn);
router.post('/check-out', presensiController.CheckOut);

// Endpoint hapus data presensi
router.delete('/:id', presensiController.deletePresensi);

// Endpoint update dengan validasi format tanggal (express-validator)
router.put(
  '/:id',
  [
    body('checkIn')
      .optional()
      .isISO8601()
      .withMessage('checkIn harus berupa format tanggal yang valid (ISO8601)'),
    body('checkOut')
      .optional()
      .isISO8601()
      .withMessage('checkOut harus berupa format tanggal yang valid (ISO8601)'),
  ],
  presensiController.updatePresensi
);

// ✅ Tambahkan endpoint search berdasarkan tanggal
router.get('/search', presensiController.searchByTanggal);

module.exports = router;
