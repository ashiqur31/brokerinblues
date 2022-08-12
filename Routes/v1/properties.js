const express = require('express');
const router = express.Router();

const propertiesController = new (require('../../Controller/v1/properties'))();
const fileManager = new (require('../../config/fileManager'))();

// Retrieve all properties
router.route('/').get(propertiesController.list);

// Create a new property
router.route('/').post(fileManager.upload().array('media', 10),propertiesController.add);

// deleted list
router.route('/list').get(propertiesController.deletedlist);

// Retrieve a single property with id
router.route('/:id').get(propertiesController.findOne);

// Update a property with id
router.route('/').put(fileManager.upload().array('media', 10),propertiesController.update);

// Delete a property with id
router.route('/:id').post(propertiesController.delete);




module.exports = router;
