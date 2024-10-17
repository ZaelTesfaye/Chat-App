require('dotenv').config();
const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const passport = require("passport")
const {maxAge} = require("express-session/session/cookie");
const crypto = require('crypto');
const {api, client} = require('../config/links')
const cookieOptions = require("../config/cookieOption");

module.exports.register = async (req, res, next) => {
    try {

        const {username, email, password} = req.body;

        const usernameCheck = await User.findOne({username});
        if (usernameCheck) {
            return res.json({
                message: "Username already taken",
                status: false
            });
        }

        const checkEmail = await User.find({email});

        if (checkEmail.length > 0) {
            return res.json({
                message: "Email already registered",
                status: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userInfo = await User.create({
            username,
            email,
            password: hashedPassword
        })
        const user = {
            _id: userInfo._id,
            username: userInfo.username,
            email: userInfo.email,
        }

        const secret = process.env.JWT_SECRET;

        const token = jwt.sign(user,secret);

        res.cookie("auth-token", token, cookieOptions)

        return res.json({
            message: "Registration successful",
            status: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {

        const {username, password} = req.body;
        const user = await User.findOne({
            username
        })

        if (user) {

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const tokenInfo = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                };

                const secret = process.env.JWT_SECRET;

                const token = jwt.sign(tokenInfo,secret);

                res.cookie("auth-token", token, cookieOptions)
                const userData = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAvatarImageSet: user.isAvatarImageSet,
                    avatarImage: user.avatarImage
                };
                return res.json({status: true, userData});

            } else {

                return res.json({status: false, message: "Incorrect Password"})
            }
        } else {
            return res.json({status: false, message: "Username not found"});
        }
    } catch (error) {
        next(error)
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        },{new: true})
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        })
    } catch (error) {
        next(error);
    }
}
module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id: {$ne: req.params.id}}).select([
            "email", "username", "avatarImage", "_id"])
        return res.json(users);
    } catch (error) {
        next(error);
    }
}

module.exports.logOut = (req, res, next) => {
    try {
        if (!req.params.id) return res.json({ msg: "User id is required " });
        onlineUsers.delete(req.params.id);
        return res.status(200).clearCookie("auth-token", cookieOptions ).send();
    } catch (ex) {
        next(ex);
    }
};

module.exports.checkUsername = async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({username});
        if (user) {
            return res.json({
                status: false,
                msg: "Username unavailable.",
            });
        } else {
            return res.json({
                status: true,
                msg: "Username available.",
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports.authenticate = async(req,res,next) => {
    try {
        const token = req.cookies['auth-token'];
        const secret = process.env.JWT_SECRET;

        if (!token) {
            return res.json({status: false, message: "User not authenticated"});
        }
        jwt.verify(token, secret, async (err, user) => {
            if (err) return res.json({status: false, message: err.message});
            return res.json({status: true, user});
        });
    }
    catch (err) {
        next(err);
    }
}


module.exports.googleAuthenticate = passport.authenticate('google', { scope: ['profile', 'email', 'openid'] });

module.exports.googleCallback = passport.authenticate('google', {
    successRedirect: `${api}/api/auth/googleLogin`,
    failureRedirect: `${client}/login`

    })

module.exports.googleLogin = async (req,res,next)=>  {
    const profile = req.user;
    const user = await User.findOne({email: profile._json.email}).select("-password")
    if (user) {
        const tokenInfo = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(tokenInfo, secret);

        res.cookie("auth-token", token, cookieOptions).redirect(client)
    }
    else {
        const newUser = await User.create({
            email: profile._json.email,
            password: await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10)
        })
        const tokenInfo = {
            _id: newUser._id,
            email: newUser.email
        }
        const secret = process.env.JWT_SECRET
        const token = jwt.sign(tokenInfo, secret)
        res.cookie("auth-token", token, cookieOptions).redirect(`${client}/setusername`);
    }
}

module.exports.getUserData = async (req,res,next) => {

    const userInfo = req.cookies["auth-token"];
    const decodedInfo = jwt.decode(userInfo);

    const userData = await User.findOne({_id: decodedInfo?._id}).select('-password')
    res.json(userData);
}

module.exports.updateUsername = async (req,res,next) => {
    const username = req.body.username;
   const token = req.cookies["auth-token"]
   const userInfo = jwt.decode(token);
   const updatedUser = await User.findByIdAndUpdate(userInfo._id, {username: username}, {new: true});
   if(updatedUser) res.json({status: true, user: updatedUser})
    else res.json({status:false});

}