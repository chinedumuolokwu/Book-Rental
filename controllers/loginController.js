const Bcrypt = require('bcrypt');
const User = require('../models/User');
const TokenGenerator = require('../services/Auth');

exports.login = async function (req, res, error) {

    if (req.method == "POST") {

        let user = {
            email:req.body.email,
            password:req.body.password
        }

        User.findOne({email:user.email}).select('+password').exec().then((found)=>{
           
            if(found){
                let userPassword = Bcrypt.compareSync(user.password,found.password)
                
                if(userPassword){
                    TokenGenerator.generate_token(found).then( token =>{
                        //set a session with the token generated
                        
                        // req.session.token = token;
                        
                        res.send({
                           status:200 , 
                           success:true , 
                           message: 'Authentication successful',
                           token:token, 
                           user: user
                        })
                    })
                    .catch(error=>{
                        res.send({              
                            status: 500,
                            success: false,
                            error: error
                        })
                    })
                   

                }else{
                    res.send({
                        status:400 , 
                        success:false ,
                         message: 'Incorrect Login Details'
                    })
                }
            }
        })

    }
}

