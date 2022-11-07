const router = require("express").Router();
const UserController = require("../controller/UserController");
const PhotoControllers = require("../controller/PhotoControllers");
const CommentControllers = require("../controller/CommentControllers");
const authentication = require("../middleware/authentication");
const authorizationUser = require("../middleware/authorizationUser");
const authorizationPhoto = require("../middleware/authorizationPhoto");
const authorizationComment = require("../middleware/authorizationComment");
const SocialController = require("../controller/SocialController");
const authorizationSocialMedia = require("../middleware/authorizationSocialMedia");

// ! USERS
router.post("/users/register", UserController.userRegister);//clear
router.post("/users/login", UserController.userLogin);//clear
router.put("/users/:userId", authentication, authorizationUser, UserController.userUpdateById);//clear
router.delete("/users/:userId", authentication, authorizationUser, UserController.deleteUserById);//clear

// ! PHOTO
router.post("/photos", authentication, PhotoControllers.createPhoto);//clear
router.get("/photos", authentication, PhotoControllers.getAllPhotos);//clear
router.put("/photos/:photoId", authentication, authorizationPhoto, PhotoControllers.photoUpdateById);//clear
router.delete("/photos/:photoId", authentication, authorizationPhoto,PhotoControllers.deletePhotoById);//clear

// ! COMMENT
router.post("/comments", authentication, CommentControllers.createComment);//clear
router.get("/comments", authentication, CommentControllers.getAllComments);//clear
router.put("/comments/:commentId", authentication, authorizationComment, CommentControllers.commentUpdateById);//clear
router.delete("/comments/:commentId", authentication, authorizationComment, CommentControllers.deleteCommentById);//clear

// ! SOCIALMEDIA
router.post("/socialmedias", authentication, SocialController.createSocialMedia);//clear
router.get("/socialmedias", authentication, SocialController.getAllSocialMedia);//clear
router.put("/socialmedias/:socialMediaId", authentication, authorizationSocialMedia, SocialController.updateSocialMediaById);//clear
router.delete("/socialmedias/:socialMediaId", authentication, authorizationSocialMedia, SocialController.deleteSocialMediaById);//clear



module.exports = router;