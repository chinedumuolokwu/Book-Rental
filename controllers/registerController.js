const Bcrypt = require('bcrypt');
const User = require('../models/User');
const TokenGenerator = require('../services/Auth');

exports.register = async function (req, res, error) {
    
    if (req.method == "POST") {
        User.findOne({email:req.body.email}).then(found =>{
            if(found){
                res.status(400).send({
                    success:false , 
                    message:'A user with this email already exist, did you forget your password?'
                })
            }else{
 
                // HAsh the password using bcrypt
                Bcrypt.hash(req.body.password, 10, function(error, passwordHash) {

                    if(error)
                    {res.send({status:500, error:error})}
                    else{
                       
                        // Create a New User using the user schema

                        new User({
        
                            
                            first_name:req.body.first_name,
                            last_name:req.body.last_name,
                            email:req.body.email,
                            password:passwordHash,
                            phone_number: req.body.phone_number
        
                        }).save( function(error,user){
                            if(error){
                                res.send({
                                    status: 401,
                                    success: false,
                                    message: error
                                })
                            }else{
                                        
                                TokenGenerator.generate_token(user).then( token =>{
                                    //set a session with the token generated
                                    // req.session.token = token;

                                    res.send({
                                        status: 200,
                                        success: true,
                                        message: "",
                                        token : token,
                                        user: user,
                                    })

                                    // user = {
                                    //     _id : user._id,
                                    //     first_name : user.first_name,
                                    //     last_name : user.last_name,
                                    //     email : user.email,                                     
                                    //     user_type:user.user_type,
                                    //     is_verified : user.is_verified,
                                    //     is_banned : user.is_banned,
                                    //     created_at : user.created_at
                                    // };

                                    // res.send({              
                                    //     status: 200,
                                    //     success: true,
                                    //     user:user,
                                    //     token:token,
                                    //     message: "Registration Successful"
                                    // })
        
                                })
                                .catch(error=>{
                                    res.send({              
                                        status: 500,
                                        success: false,
                                        error: error
                                    })
                                })
        
                            }
                        })
                    }

                });
               
            }
        })
    }  

}

 