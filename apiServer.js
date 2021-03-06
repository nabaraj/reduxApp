var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));

//APIS strt
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/bookshop",
  { useNewUrlParser: true }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "# MongoDB -connection error;"));

// setup session
app.use(
  session({
    secret: "mySecretString",
    saveUnitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
    //two days in miliseconds
    store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
  })
);
//SAVE SESSION CART API
app.post("/cart", function(req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if (err) {
      throw err;
    }
    res.json(req.session.cart);
  });
});
//GET SESSION CART API
app.get("/cart", function(req, res) {
  if (typeof req.session.cart !== "undefined") {
    res.json(req.session.cart);
  }
});
//end session set up

var Books = require("./models/books.js");
// post api start
app.post("/books", function(req, res) {
  var book = req.body;
  console.log("post request", book);
  Books.create(book, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});
// post api end
// GET books
app.get("/books", function(req, res) {
  Books.find(function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});
// DELETE BOOKS
app.delete("/books/:_id", function(req, res) {
  //console.log("####################### ", req);
  var query = { _id: req.params._id };
  console.log("qqqqqqqqqqqqqqqqqqq ", query);
  Books.remove(query, function(err, books) {
    console.log("####################### ", err);
    if (err) {
      throw err;
    }
    res.json(books);
  });
});
// UPDATE BOOKS
app.put("/books/:_id", function(req, res) {
  //console.log("####################### ", req);
  var book = req.body;
  console.log(req.body);
  var query = { _id: req.params._id };
  //if the field doesn't exist $set will set a new field
  console.log(req.params._id);
  var update = {
    $set: {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  var options = { new: true };
  //When true returns the updated document
  Books.findOneAndUpdate(query, update, options, function(err, books) {
    if (err) {
      console.log("dddddd");
      throw err;
    }
    res.json(books);
  });
});
//APIS end

app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("API Server is listening on http://localhost:3001");
});
