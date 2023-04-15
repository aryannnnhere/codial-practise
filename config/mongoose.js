const mongoose = require('mongoose');

// mongoose.connect('mongoose://localhost/codial_development');

const db = main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Social-Media');
  console.log("Successfully connected to MongoDB");
//   use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = db;

module.exports = db;