const express = require('express');
const router = express.Router();

const countriesController = new (require('../../Controllers/v1/countries'))();

// Retrieve all country
router.route('/').get(countriesController.list);

module.exports = router