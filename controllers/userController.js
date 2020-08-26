const User = require('../models/User');
const mongoose = require('mongoose');

exports.get_users = async function (req, res, error) {

    //view all my users
    if (req.method == "GET") {

        User.find({}).then(users => {
            if (!users) {
                res.status(400).send({
                    success: false,
                    message: 'no user registered yet'
                });
            } else {
                res.send({
                    status: 200,
                    success: true,
                    users: users,
                })
            }


        });

    }

}

exports.create_user = async function (req, res, error) {

    //create a user
    if (req.method == "POST") {

        new User({
            first_name:  req.body.first_name,
            last_name:   req.body.last_name,
            email:       req.body.email,
            phone_number:req.body.phone_number 
        }).save()
            .then(function (user) {

                res.send({
                    success: true,
                    user: user,
                    message: "User successfully created"
                })
            })
            .catch(error => {
                res.send({ error })
            })





    }
}

exports.get_user = async function (req, res, error) {

    //get a specified user by id
    if (req.method == "GET") {

        User.findOne({ "_id": mongoose.Types.ObjectId(req.params.user_id) }).then(user => {
            if (!user) {

                res.status(400).send({
                    success: false,
                    message: 'No User with the given id'
                });
            } else {
                res.send({
                    status: 200,
                    success: true,
                    user:user,
                })
            }


        });

    }

}

exports.edit_user = async function (req, res, error) {

    if (req.method == "POST") {
        User.where({ "_id": mongoose.Types.ObjectId(req.body.user_id) })
            .updateOne({ $set: { first_name: req.body.first_name, last_name: req.body.last_name } }).exec() // executed
            .then(function (user) {

                res.send({
                    status: 200,
                    success: true,
                    message: "This user has been updated"
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

exports.delete_user= async function (req, res, error) {

    if (req.method == "DELETE") {

        User.findOne( { _id: mongoose.Types.ObjectId(req.params.user_id)}) 
            .then(user => {
                if (!user) {
                    res.status(400).send({
                        success: false,
                        message: 'User with this id not found'
                    });
                } else {
                    user.remove(function (error, user) {
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
                                message: "User deleted successfully"
                            })
                        }
                    })
                }
            });
    }
}