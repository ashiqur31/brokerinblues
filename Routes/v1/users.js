const express = require('express');
const router = express.Router();

const usersController = new (require('../../Controller/v1/users'))();

// Create a new user
router.route('/').post(usersController.add);

// Login Customer
// router.route('/login').post(usersController.login);



module.exports = router;
