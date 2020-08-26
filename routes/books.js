const express = require('express');
const router = express.Router();
const multer = require('multer');



/////////////Controllers Import////////////
const bookController = require('../controllers/bookController');

const file_upload = require('../fileUploader');



////////////Route Management////////////////
router.get('/all_books', bookController.get_books);
router.get('/:book_id', bookController.get_book);
router.post('/create_book', bookController.create_book);
router.post('/upload_book', file_upload.upload.single('files'), bookController.upload_book);
router.put('/edit_book/:book_id', bookController.edit_book);
router.delete('/delete_book/:book_id', bookController.delete_book);
router.get('/author/:author_id', bookController.getBookByAuthor);

/////////////Route Export//////////////
module.exports = router;