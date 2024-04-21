const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/CourseSelling");

if(!connect)
{
  console.log("Database cannot be Connected");
}
else
{
  console.log("Database Connected Successfully");
}
