var data = require("../objects/edit");
const mongoose = require("mongoose");
let Recipe = require("./models/models.js");
let fs = require('fs')
let images = require('./imgs.json');
let images1 = require('./imgs1.json');
let images2 = require('./imgs2.json');
let images3 = require('./imgs3.json');
let images4 = require('./imgs4.json');
let images5 = require('./imgs5.json');
let images6 = require('./imgs6.json');
let images7 = require('./imgs7.json');
let images8 = require('./imgs8.json');
let images9 = require('./imgs9.json');
let images10 = require('./imgs10.json');
let images11 = require('./imgs11.json');
let images12 = require('./imgs12.json');


mongoose.connect('mongodb://localhost:27017/updated', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', function () { console.log('connection error:') });

db.once('open', function () {
    console.log("we're connected!")
});

images.push(...images1, ...images2, ...images3, ...images4, ...images5, ...images6, ...images7, ...images8, ...images9, ...images10, ...images11, ...images12);
console.log(images.length)

// var data1 = images.map((e, i) => ({ ...data[i], comments: [{ user_name: "", comment_body: "" }], likes: 0, dislikes: 0, image: e }))
// console.log(data1[data1.length - 1])
var data1 = data.map((e, i) => ({ ...e, comments: [{ user_id: 1, user_name: "Niranajn Ganesh", comment_body: "loved the recipe <3" }], likes: 0, dislikes: 0, image: images[i] }))
console.log(data1[999])

// fs.writeFileSync('updated.json', ...data1, "utf-8")
//     (err => {
//         if (err) {
//             console.log(err)
//         }
//         else { console.log("working") }
//     })

// Recipe.insertMany(data1)
//     .then(d => { console.log(true) }).catch(err => { console.log(err) })
