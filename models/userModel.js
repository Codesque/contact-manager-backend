const mongoose = require('mongoose'); 

const mongooseSchema = mongoose.Schema({

    username: {
        type: String, 
        required: [true , "Please enter your username"]
    },
    email: {
        type: String, 
        required: [true, "Please enter your email"], 
        unique : [true , "Email address already Taken"],
    }, 
    password : {
        type: String, 
        required: [true , "Please enter your password"],
    },

},
{
    timestamps : true,
}

)

module.exports = mongoose.model('User', mongooseSchema);