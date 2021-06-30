const express = require ('express');
const router = express.Router();

//import controller
const {requireSignin} = require ('../controllers/auth');
const{getUser, update, allUsers, deleteUser, userById, hasAuthorization, userPhoto} = require('../controllers/user');
const{userUpdateValidator} = require('../validators/auth');
const{runValidation} = require('../validators');


router.get("/users", allUsers)
router.get("/user/:userId",requireSignin, getUser )
router.put('/user/:userId',requireSignin,  update);
router.delete("/user/:userId", requireSignin, deleteUser)
//photos
router.get("/user/photo/:userId", userPhoto);

//if any route containing userID, the app will first execute userById()
router.param("userId", userById);




module.exports = router;