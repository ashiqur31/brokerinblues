const express = require('express');
const router = express.Router();

const savedpropertiesController = new (require('../../Controller/v1/savedproperties'))();

// Create saves properties
router.route('/').post(savedpropertiesController.add);

// get saved properties list
router.route('/list').post(savedpropertiesController.list);

// delete property
router.route('/delete').delete(savedpropertiesController.delete);



module.exports = router;
