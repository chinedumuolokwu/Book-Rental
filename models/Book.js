var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authorSchema = require('./Author');
var genreSchema = require('./Genre');
var uniqueValidator = require('mongoose-unique-validator');


var BookSchema = new Schema({
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  publisher: {
    type: String,
  }
});

module.exports = mongoose.model('Book', BookSchema);
