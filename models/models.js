const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    RecipeName: String,
    TranslatedRecipeName: String,
    Ingredients: String,
    TranslatedIngredients: String,
    Image: String,
    PrepTimeInMins: Number,
    CookTimeInMins: Number,
    TotalTimeInMins: Number,
    Servings: Number,
    Cusine: String,
    Course: String,
    Diet: String,
    Instructions: String,
    TranslatedInstructions: String,
    URL: String,
    likes: Number,
    dislikes: Number,
    image: {
        type: String,
        default: 'https://images.pexels.com/photos/6119130/pexels-photo-6119130.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'
    },
    comments: [{
        user_id: String,
        user_name: String,
        comment_body: String,
    }]
})

let Recipe = new mongoose.model("Recipe", recipeSchema, "recipes")

module.exports = Recipe;


// let User = new mongoose.model('User', userSchema, 'user')
