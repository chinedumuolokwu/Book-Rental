const Genre = require('../models/Genre');
const mongoose = require('mongoose');


exports.get_genres = async function (req, res, error) {

    //view all my genres
    if (req.method == "GET") {

        Genre.find({}).then(genre => {
            if (!genre) {
                res.status(400).send({
                    success: false,
                    message: 'no genre registered yet'
                });
            } else {
                res.send({
                    status: 200,
                    success: true,
                    genre: genre
                })
            }


        });

    }

}

exports.create_genre = async function (req, res, error) {

    //create a genre
    if (req.method == "POST") {

        new Genre({
           name: req.body.name
        }).save()
            .then(function (genre) {

                res.send({
                    success: true,
                    genre: genre,
                    message: "Genre successfully created"
                })
            })
            .catch(error => {
                res.send({ error })
            })

    }
}

exports.get_genre = async function (req, res, error) {

    //get a specified genre by id
    if (req.method == "GET") {

        Genre.findOne({ "_id": mongoose.Types.ObjectId(req.params.genre_id) }).then(genre => {
            if (!genre) {

                res.status(400).send({
                    success: false,
                    message: 'No Genre with the given id'
                });
            } else {
                res.send({
                    status: 200,
                    success: true,
                    genre: genre,
                })
            }


        });

    }

}

exports.edit_genre = async function (req, res, error) {
    console.log(req.params);
    if (req.method == "PUT") {
        Genre.findByIdAndUpdate(req.params.genre_id,
            {name: req.body.name}).exec()
            // where({ "_id": mongoose.Types.ObjectId(req.params.genre_id) })
            // updateOne({ $set: { title: req.body.title, genre: req.body.genre } }) // executed
            .then(function (genre) {

                res.send({
                    status: 200,
                    success: true,
                    message: "This genre has been updated"
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
//Delete genre
exports.delete_genre= async function (req, res, error) {

    if (req.method == "DELETE") {

        Genre.findOne( { _id: mongoose.Types.ObjectId(req.params.genre_id)}) 
            .then(genre => {
                if (!genre) {
                    res.status(400).send({
                        success: false,
                        message: 'Genre with this id not found'
                    });
                } else {
                    genre.remove(function (error, user) {
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
                                message: "Genre deleted successfully"
                            })
                        }
                    })
                }
            });
    }
}
