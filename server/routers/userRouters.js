const {register, login, setAvatar, getAllUsers,logOut, getUserData, checkUsername, authenticate, googleAuthenticate, googleCallback,googleLogin,
    updateUsername
} = require("../controllers/userController")


const express = require ('express')
const router = express.Router();

router.post("/register",register)
router.post('/login', login)
router.post('/setAvatar/:id', setAvatar)
router.get('/allUsers/:id', getAllUsers)
router.post("/checkusername", checkUsername)
router.get("/logout/:id", logOut)
router.get("/authenticate",authenticate)
router.get("/google", googleAuthenticate)
router.get("/google/callback", googleCallback)
router.get("/googleLogin", googleLogin)
router.get("/get-user-data", getUserData);
router.post("/update-username", updateUsername);


module.exports=router;