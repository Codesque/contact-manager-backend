const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//@desc Register user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body; 
    if (!username || !email || !password) {
        res.status(400); 
        throw new Error("All fields are mandatory");
    }

    const userAvalible = await User.findOne({ email }); 
    if (userAvalible) {
        res.status(400); 
        throw new Error("User Already Registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    }); 

    console.log(`${newUser.username} is successfully created`); 
    if (newUser) res.status(201).json({ _id: newUser.id, email: newUser.email });
    else {
        res.status(400); 
        throw new Error('User data is not valid!');
    }

}); 

//@desc Login user
//@route POST /api/users
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; 
    if (!email || !password) {
        res.status(400); 
        throw new Error('All fields are mandatory!');
    }

    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        
        )
        res.status(200).json({accessToken});
    } 
    else {
        res.status(401); 
        throw new Error("Email or password is not valid");
    }
});

//@desc current user
//@route POST /api/users
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = {
    registerUser,
    loginUser,
    currentUser
};