const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const User = require('../models/user.js');
const passport = require('passport');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');



router.post(('/signup'), async (req, res) => {

    var { email } = req.body;
    var { username } = req.body;
    var { password } = req.body;

    var check = await User.find({ email_id: email })
    if (check.length == 0) {
        const user = new User({
            email_id: email, username: username
        })

        console.log('registeration success')
        await User.register(user, password)
        const getuser = await User.findOne({ email_id: email })
        const token = jwt.sign({ id: getuser._id }, 'jwtSecret')
        return res.json({ auth: true, token: token, user: getuser });
    }
    else { res.send('User Exists') }




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