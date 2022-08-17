const express = require('express');
const router = express.Router();

const usersController = new (require('../../Controller/v1/users'))();

// Create a new user
router.route('/').post(usersController.add);

// Login user
router.route('/login').post(usersController.login);

// Logout user
router.route('/logout').post(usersController.logout);



module.exports = router;
