const express = require('express');
const router = express.Router();
const { addName } = require('../controllers/mapController');
const { getMapInfo } = require('../controllers/mapController');
const { addMap } = require('../controllers/mapController');

// Add Place in the Map
router.post('/addName',addName);

router.post('/getMapinfo',getMapInfo);

router.post('/addMap',addMap);
module.exports = router;