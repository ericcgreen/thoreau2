const express =     require('express')
const app =         express()
const parser =      require('body-parser')
const hbs =         require('express-handlebars')
const mongoose =    require('./db/connection.js')

var Article = mongoose.model("Article")

app.set("port", process.env.PORT || 3001)

// replaced express front-end with angularjs
// app.set("view engine", "hbs")
// app.engine(".hbs", hbs({
//   extname:        ".hbs",
//   partialsDir:    "views/",
//   layoutsDir:     "views/",
//   defaultLayout:  "layout-main"
// }))


app.use("/assets", express.static("public"))
app.use(parser.json({extended: true}))

app.use(express.static(__dirname + '/public'))

app.get("/api/articles", (req, res) => {
  Article.find({}).then((articles) => {
  // find everything, the search is not limited to certain key-value pairs
    res.json(articles)
    // render the server response back to the browser
  })
})

app.get("/api/articles/:post_title", (req, res) => {
  Article.findOne({post_title: req.params.post_title}).then((article) => {
    res.json(article)
  })
})

app.post("/api/articles", (req, res) => {
  Article.create(req.body).then((article) => {
    res.json(article)
  })
})

app.delete("/api/articles/:post_title", (req, res) => {
  Article.findOneAndRemove({post_title: req.params.post_title}).then(() => {
    res.json({success: true})
  })
})

app.put("/api/articles/:post_title", (req, res) => {
  Article.findOneAndUpdate({post_title: req.params.post_title}, req.body, {new: true}).then((article) => {
    res.json(article)
  })
})

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(app.get("port"), () => {
  console.log('App is listening')
})
