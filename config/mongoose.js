// const mongoose = require('mongoose');

// // mongoose.connect('mongoose://localhost/codial_development');

// const db = main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/Social-Media');
//   console.log("Successfully connected to MongoDB");
// //   use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// module.exports = db;



const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Social-Media");


const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));

db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

module.exports = db;

