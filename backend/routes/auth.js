const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const { getToken } = require('../utils/helper');

// Register route
router.post('/register', async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    // Does a user with this username already exist?
    const existingUser = await User.findOne({ email:email });
    if (existingUser) {
        return res.status(403).json({ error: 'User already exists' });
    }
    // Create a new user
    if (!firstName || !username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    try {
        // we convert password to hash before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, username, email, password: hashedPassword });
        await newUser.save();

        // User registered successfully
        // You can also generate a JWT token here if needed
        const token = await getToken(email,newUser);
        const userToReturn = {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username,
            email: newUser.email,
            token: token
        };
        res.status(200).json({
            user: userToReturn,
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(403).json({ error: 'Invalid credentials' });
    }
    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
       return res.status(403).json({ error: 'Invalid credentials' });
    }
    // Generate a token
    const token = await getToken(email, user);
    const userToReturn = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token: token
    };
    res.status(200).json({
        user: userToReturn,
        message: 'User login successfully'
    });
});

module.exports = router;