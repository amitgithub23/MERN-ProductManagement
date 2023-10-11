const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.DATABASE_URL;
console.log(url);
mongoose.connect(url);