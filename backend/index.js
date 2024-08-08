//const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
const port = 5000;

const uri = process.env.MONGODB_URL;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const { v4: uuidv4 } = require('uuid');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String, default: '' }
})

const User = mongoose.model('user', userSchema);


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


app.post('/register', async (req, res) => {
    let registerUser
    const userId = uuidv4();
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    registerUser = new User({ userId, name, email, password: hashedPassword });
    try {
        const user = await registerUser.save();
        console.log(user);
        res.status(201).send('User registered')
    } catch (err) {
        console.log(err);
        res.status(500).send('err, user not registered')
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        console.log('User not found');
        return res.status(400).send('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log('Invalid password');
        return res.status(401).send('Invalid password');
    }
    const token = jwt.sign({ _id: user._id }, jwtSecretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'Lax' }); // Set secure to true in production
    console.log('Login successful');
    res.status(200).send('Login success');
});

app.get('/check-auth', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Not authenticated');
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        res.status(200).send({ authenticated: true, userId: decoded._id });
    } catch (err) {
        res.status(401).send('Invalid token');
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'Lax' }); // Adjust sameSite and secure as needed
    res.status(200).send('Logout successful');
});

app.get('/get-user-info', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Not authenticated');
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const user = await User.findById(decoded._id);
        res.status(200).send(user);
    } catch (err) {
        res.status(401).send('Invalid token');
    }
});
