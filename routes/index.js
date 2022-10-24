const router = require('express').Router();
const UserController = require('../controller/UserController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.post('/users/register', UserController.userRegister);
router.post('/users/login', UserController.userLogin);
router.get('/users/:userId', authentication, authorization, UserController.userUpdateById);



module.exports = router;