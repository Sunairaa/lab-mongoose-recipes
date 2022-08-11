const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://0.0.0.0:27017/recipe-app';

const recipeObj = {
  title : 'Pasta1',
  cuisine: 'Italian'
}


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {console.log("connection is made");})
  // Run your code here, after you have insured that the connection was made
  // iteration # 2 - create a recipe
  .then(() => {
    return Recipe.create(recipeObj)
  })
  .then((results) => console.log(`Created recipe object:  ${results.title}`))
  // iteration # 3 - insert multiple entries from data.json
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((results) => {
    results.forEach(recipe => console.log(`Recipe Title:  ${recipe.title}`))
  })
  // iteration # 4 - update duration in database of recipe name "Rigatoni alla Genovese"
  .then(() => {
      return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  })
  .then((results) => {
    console.log(`Recipe duration:  ${results}`);
  })
  // iteration # 5 - delete the recipe named "Carrot cake"
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then((results) => {
    console.log(`Successfully deleted:  ${JSON.stringify(results)}`);
  })
  // iteration # 6 - close database connection
  .then(() => {
    mongoose.connection.close(() => {
      console.log(`Mongo connection disconnected`);
      process.exit(0);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
