const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const books = require('../models/Book');


const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]

});

module.exports = mongoose.model('Author', AuthorSchema);
