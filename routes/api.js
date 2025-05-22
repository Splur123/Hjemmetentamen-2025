const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/status', apiController.getStatus);
router.get('/items', apiController.getItems);
router.post('/items', apiController.createItem);
router.delete('/items/:id', apiController.deleteItem);

module.exports = router;
