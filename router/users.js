const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const User = require('../models/user.js');
const passport = require('passport');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');



router.post(('/signup'), async (req, res) => {
    console.log(req.body)
    try {
        var { email } = req.body;
        var { username } = req.body;
        var { password } = req.body;
        const user = new User({
            email_id: email, username: username
        })

        console.log(user)
        await User.register(user, password)
        const getuser = await User.findOne({ email_id: email })
        const token = jwt.sign({ id: getuser._id }, 'jwtSecret')
        return res.json({ auth: true, token: token, user: getuser });

    } catch (err) {
        console.log(err.message)
        if (err.message == 'A user with the given username is already registered') {
            res.send(new Error({ message: 'Already registred', status_code: 409 }))
        }
        console.log(err.message)
    }
})


router.post('/login', passport.authenticate('local'), (req, res) => {

    if (req.isAuthenticated()) {
        console.log(req.user)
        const token = jwt.sign({ id: req.user._id }, 'jwtSecret')
        req.session.user = req.user
        return res.json({ auth: true, token: token, user: req.user });

    }
    else { res.send(status) }

})

router.get(('/edit'), (req, res) => {
    if (req.session.user_id) {

        console.log(true)
    }
    else (console.log(false))

})

router.get(('/logout'), (req, res) => {
    req.logOut();
    res.send('logedout')
})

module.exports = router