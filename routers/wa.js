const express = require('express');
const router = express.Router();
const api = require('../controllers/waController');

router.get('/api', api);
router.post('/api', api);

module.exports = router;