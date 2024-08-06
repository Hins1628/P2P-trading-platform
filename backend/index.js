//const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 5000;

const uri = process.env.MONGODB_URL;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
})

const User = mongoose.model('user', userSchema);


app.get('/', (req,res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


app.post('/register', async (req,res) => {
    let registerUser
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    registerUser = new User({ email, password: hashedPassword})
    try {
        const user = await registerUser.save();
        console.log(user);
        res.status(201).send('User registered')
    } catch(err) {
        console.log(err);
        res.status(500).send('err, user not registered')
    }
})

app.post('/login', async (req,res) => {
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
    const token = jwt.sign({ _id: user._id}, jwtSecretKey, { expiresIn: '1h'});
    console.log('login successful');
    res.status(200).json({ token });
    
})