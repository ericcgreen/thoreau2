const mongoose  = require("./connection");
const seedData  = require("./seeds");

var Article = mongoose.model("Article");

// Clears the entire database
Article.remove({}).then(function(){
  // Creates a collection using the JSON contained in our seed file
  Article.collection.insert(seedData).then(function(){
    process.exit();
  });
});
