const mongoose = require("mongoose");

const Loginschema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },

    email :
    {
        type:String,
        required: true
    },

    contact :
    {
        type:String,
        required: true
    },


    password: {
        type: String,
        required: true
    }
});


const users = new mongoose.model("users", Loginschema);
module.exports = users;