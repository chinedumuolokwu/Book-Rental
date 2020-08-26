const Author = require('../models/Author');
const mongoose = require('mongoose');
const books = require('../models/Book');


exports.get_authors = async function (req, res, error) {

    //view all my users
    if (req.method == "GET") {

        Author.find({})
        .populate('Book')
        .then(author => {
            if (!author) {
                res.status(400).send({
                    success: false,
                    message: 'no author registered yet'
                });
            } else {
                res.send({
                    status: 200,
                    success: true,
                    author: author
                })
            }


        });

    }

}

exports.create_author = async function (req, res, error) {

    //create a author
    if (req.method == "POST") {

        new Author({
           name: req.body.name
        }).save()
            .then(function (author) {

                res.send({
                    success: true,
                    author: author,
                    message: "Author successfully created"
                })
            })
            .catch(error => {
                res.send({ error })
            })

    }
}

exports.get_author = async function (req, res, error) {

    //get a specified author by id
    if (req.method == "GET") {

        Author.findOne({ "_id": mongoose.Types.ObjectId(req.params.author_id) }).populate('books', 'title').then(author => {
            if (!author) {

                res.status(400).send({
                    success: false,
                    message: 'No Author with the given id'
                });
            } else {
                res.send({
                    status: 200,
                    success: true,
                    author: author,
                })
            }


        });

    }

}

exports.edit_author = async function (req, res, error) {
    console.log(req.params);
    if (req.method == "PUT") {
        Author.findByIdAndUpdate(req.params.author_id,
            {name: req.body.name}).exec()
            // where({ "_id": mongoose.Types.ObjectId(req.params.author_id) })
            // updateOne({ $set: { title: req.body.title, author: req.body.author } }) // executed
            .then(function (author) {

                res.send({
                    status: 200,
                    success: true,
                    message: "This author has been updated"
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
//Delete author
exports.delete_author= async function (req, res, error) {

    if (req.method == "DELETE") {

        Author.findOne( { _id: mongoose.Types.ObjectId(req.params.author_id)}) 
            .then(author => {
                if (!author) {
                    res.status(400).send({
                        success: false,
                        message: 'Author with this id not found'
                    });
                } else {
                    author.remove(function (error, user) {
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
                                message: "Author deleted successfully"
                            })
                        }
                    })
                }
            });
    }
}
