const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');
const mongoose = require('mongoose');

exports.upload_book = async function (req, res) {
        const file = req.file
        if (!file) {
          return res.status(400).send('Unable to upload book');  
        }
        console.log(file);   
      }


exports.get_books = async function (req, res, error) {

    //view all my books
    if (req.method == "GET") {

        Book.find({})
            // .populate(Author, 'name')
            .then(books => {
                if (!books) {
                    res.status(400).send({
                        success: false,
                        message: 'no book registered yet'
                    });
                } else {
                    res.send({
                        status: 200,
                        success: true,
                        books: books,
                    })
                }


            });

    }

}

exports.getBookByAuthor = async function (req, res) {
    const result = await Book.find({ author: req.params.author_id }).populate("author").exec();
    res.send(result);
}

exports.create_book = async function (req, res, error) {

    //create a book
    if (req.method == "POST") {

        let count = await Book.findOne({ isbn: req.body.isbn });
        if (count) {
            return res.status(400).send({
                success: false,
                message: "isbn already used"
            })
        }
        Author.findOne({ name: req.body.author }).then(async (author) => {
            if (!author) {
                author = await new Author({
                    name: req.body.author
                }).save();
            
            }

            try {
                let book = await new Book({
                    isbn: req.body.isbn,
                    title: req.body.title,
                    author: author._id,
                    publisher: req.body.publisher
                }).save()

                if (book) {
                    await Author.update({ "_id": author._id }, { $push: { books: book._id } }, { new: true })

                    res.send({
                        success: true,
                        book: book,
                        message: "Book successfully created"
                    });
                }
            } catch (error) {
                res.send({ error })
            }
        });
    }

    // one to many relation in mongoose
    // Author.findOne({ name: req.body.author }).
}

exports.get_book = async function (req, res, error) {

    //get a specified book by id
    if (req.method == "GET") {

        Book.findOne({ "_id": mongoose.Types.ObjectId(req.params.book_id) }).then(book => {
            if (!book) {

                res.status(400).send({
                    success: false,
                    message: 'No Book with the given id'
                });
            } else {
                res.send({
                    status: 200,
                    success: true,
                    book: book,
                })
            }


        });

    }

}

exports.edit_book = async function (req, res, error) {
    console.log(req.params);
    if (req.method == "PUT") {
        Book.findByIdAndUpdate(req.params.book_id,
            { title: req.body.title, author: req.body.author }).exec()
            // where({ "_id": mongoose.Types.ObjectId(req.params.book_id) })
            // updateOne({ $set: { title: req.body.title, author: req.body.author } }) // executed
            .then(function (book) {

                res.send({
                    status: 200,
                    success: true,
                    message: "This book has been updated"
                })
            })
            .catch(function (error) {
                if (error) {
                    res.send({
                        status: 401,
                        success: false,
                        message: error
                    })
                }
            })
    }
}
//Delete book
exports.delete_book = async function (req, res, error) {

    if (req.method == "DELETE") {

        Book.findOne({ _id: mongoose.Types.ObjectId(req.params.book_id) })
            .then(book => {
                if (!book) {
                    res.status(400).send({
                        success: false,
                        message: 'Book with this id not found'
                    });
                } else {
                    book.remove(function (error, user) {
                        if (error) {
                            res.send({
                                status: 401,
                                success: false,
                                message: error
                            })
                        } else {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Book deleted successfully"
                            })
                        }
                    })
                }
            });
    }
}