const express = require('express')
const EventController = require('../controllers/EventController')
const router = express.Router();


router.get('/',EventController.getAllEvent);
router.post('/', EventController.createEvent);
router.patch('/:eventId', EventController.updateEvent);
router.delete('/:eventId', EventController.deleteEvent);

module.exports = router