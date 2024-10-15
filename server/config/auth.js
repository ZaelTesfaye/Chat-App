require("dotenv").config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
            return done (null, profile)
    }));

passport.serializeUser((profile, done) => {
    done(null, profile);
})

passport.deserializeUser((profile, done) => {
    done(null, profile);
})

