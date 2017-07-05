var mongoose  = require("mongoose");

var ArticleSchema = new mongoose.Schema(
  {
      "ID": Number,
      "post_date": String,
      "post_content": String,
      "post_title": String,
      "post_name": String,
      "post_author": String,
      "post_type": String,
      "tips": String,
      "headerImage": String,
      // "source": String,
      // "link": String,
      // "tags": String,
      // "rating": String,
  }
);

mongoose.model("Article", ArticleSchema);
mongoose.connect("mongodb://localhost/thoraeu2");

module.exports = mongoose;

// process.env.MONGODB_URI ||
