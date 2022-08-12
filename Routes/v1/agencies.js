const express = require('express');
const router = express.Router();

const agencyController = new (require('../../Controller/v1/agencies'))();

// Retrieve all agencies
router.route('/').get(agencyController.list);

// Create a new agency
router.route('/').post(agencyController.add);

// deleted list
router.route('/list').get(agencyController.deletedlist);

// Retrieve a single agency with id
router.route('/:id').get(agencyController.findOne);

// Update a agency with id
router.route('/').put(agencyController.update);

// Delete a agency with id
router.route('/:id').post(agencyController.delete);

module.exports = router;
