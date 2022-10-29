const router = require("express").Router();
const UserController = require("../controller/UserController");
const PhotoControllers = require("../controller/PhotoControllers");
const authentication = require("../middleware/authentication");
const authorizationUser = require("../middleware/authorizationUser");
const authorizationPhoto = require("../middleware/authorizationPhoto");

// ! USERS
router.post("/users/register", UserController.userRegister);
router.post("/users/login", UserController.userLogin);
router.put(
  "/users/:userId",
  authentication,
  authorizationUser,
  UserController.userUpdateById
);
router.delete(
  "/users/:userId",
  authentication,
  authorizationUser,
  UserController.deleteUserById
);

// ! PHOTO
router.post("/photos", authentication, PhotoControllers.createPhoto);
router.get("/photos", authentication, PhotoControllers.getAllPhotos);
router.put(
  "/photos/:photoId",
  authentication,
  authorizationPhoto,
  PhotoControllers.photoUpdateById
);
router.delete(
  "/photos/:photoId",
  authentication,
  authorizationPhoto,
  PhotoControllers.deletePhotoById
);
module.exports = router;
