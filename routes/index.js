const router = require('express').Router();
const UserController = require('../controller/UserController');
const authentication = require('../middleware/authentication');
const authorizationUser = require('../middleware/authorizationUser');

// ! USERS
router.post('/users/register', UserController.userRegister);
router.post('/users/login', UserController.userLogin);
router.put('/users/:userId', authentication, authorizationUser, UserController.userUpdateById);
router.delete('/users/:userId', authentication, authorizationUser, UserController.deleteUserById);

// ! PHOTO



module.exports = router;