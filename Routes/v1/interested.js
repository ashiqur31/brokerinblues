const express = require('express');
const router = express.Router();

const interestedController = new (require('../../Controller/v1/interested'))();

// Retrieve all interested users
router.route('/').get(interestedController.list);

// Create a new interested user
router.route('/').post(interestedController.add);

// deleted list
router.route('/list').get(interestedController.deletedlist);

// Retrieve a single interested user with id
router.route('/:id').get(interestedController.findOne);

// Update a interested user with id
router.route('/').put(interestedController.update);

// Delete a interested user with id
router.route('/:id').post(interestedController.delete);

module.exports = router;
