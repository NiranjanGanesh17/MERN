const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = mongoose.Schema({
    email_id: {
        type: String,
        required: true,
        unique: true
    }

})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema, 'user');
module.exports = User;