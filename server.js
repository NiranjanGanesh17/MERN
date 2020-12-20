const express = require('express');
const path = require('path');
const isLoggedIn = require('./middlewares/isLoggedIn');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose');
const users = require('./router/users.js');
const Recipe = require('./models/models')
const cors = require('cors');
var shuffle = require("shuffle-array");
// const { default: Recipes } = require('./recipeapp/src/components/Recipes.jsx');


const app = express();
app.use(cookieParser())
app.use(cors());

const port = process.env.PORT || 5000;

// mongodb://localhost:27017/updated

mongoose.connect('mongodb+srv://Niro:niraNJAN123@cluster0.ndsay.mongodb.net/updated?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', function () { console.log('connection error:') });

db.once('open', function () {
    console.log("we're connected!")
});




app.listen(port, () => console.log(`we are listening on the port..${port}`))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get(('/'), async (req, res) => {
    var re = await Recipe.find({ likes: { $gt: 1 } })
    var result = shuffle.pick(re, { picks: 6 })
    res.json(result)
});

app.get(('/home'), async (req, res) => {
    var re = await Recipe.find({ likes: { $gt: 1 } })
    var result = shuffle.pick(re, { picks: 6 })
    res.json(result)
});
//filtering data
app.post(('/recipes'), async (req, res) => {
    var key = Object.keys(req.query)
    var serve = parseInt(key[0])
    var diet = key[1]
    var TotalTimeInMins = key[3]
    var re = await Recipe.find({ Servings: serve, Diet: diet })
    var result = shuffle.pick(re, { picks: 20 })
    res.json(result)

})
//likes
app.get(('/like'), async (req, res) => {
    var recipeid = (req.query)
    var id = Object.keys(recipeid)
    console.log(id)
    const getlikes = await Recipe.findById({ _id: id[0] })
    var likeupdate = (getlikes.likes) + 1
    const updating = await Recipe.update({ _id: id[0] },
        { $set: { 'likes': likeupdate } })
    const details = await Recipe.findById({ _id: id[0] })

})
//Creating a comment (CREATE)
app.post(('/content'), isLoggedIn, async (req, res) => {

    var username = (req.body.username)
    var comment = (req.body.comment)
    var detailsId = req.body.id;
    console.log((req.userId))
    await Recipe.findByIdAndUpdate({ _id: detailsId },
        { $push: { "comments": { user_name: username, comment_body: comment, user_id: (req.userId) } } },
        { safe: true, upsert: true, new: true })
    var details = await Recipe.findById({ _id: detailsId })
    console.log(details)
    res.json(details)
});
// Update Comment
app.post(('/content/update'), isLoggedIn, async (req, res) => {

    var { comment, recipe_id, comment_id } = req.body


    var updating = await Recipe.updateOne({ _id: recipe_id, 'comments._id': comment_id, 'comments.user_id': req.userId },
        { $set: { 'comments.$.comment_body': comment } }).then((res) => { console.log(res) })

    var updated = await Recipe.findById({ _id: recipe_id })
    // console.log(updated)
    res.json(updated)



})

// deliting a comment (DELETE)
app.post(('/content/delete'), async (req, res) => {
    var { recipe_id } = req.body;
    var { comment_id } = req.body;
    // var id = Object.keys(query)
    const deleting = await Recipe.findByIdAndUpdate({ _id: recipe_id }, { $pull: { 'comments': { _id: comment_id } } }, { 'new': true })
    const details = await Recipe.findById({ _id: recipe_id })
    res.json(details)

})

app.use(('/users'), users)


//auto build for production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('recipeapp/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'recipeapp/build', 'index.html'))
    })
}
