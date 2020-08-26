const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var user_profile = new Schema({

    first_name:  String,
    last_name:  {type:String, default:'Proda'},
    email: String,
    password: {type: String, select: false},
    phone_number: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

});

//for text search
// user_profile.index({services: 'text', specialization: 'text'});

module.exports =  mongoose.model("User", user_profile);
