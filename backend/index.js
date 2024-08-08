//const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');

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

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');


// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({ storage: storage });

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    description: { type: String, default: '' },
})

const User = mongoose.model('user', userSchema);

const ProductSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: 'Available' },
    productStatus: { type: String, default: '' },
    description: { type: String, default: '' },
    sellerId: { type: String, required: true },
    sellerName: { type: String, required: true },
    images: { type: [String], validate: [imgLimit, '{PATH} exceeds the limit of 4'] },
    time: { type: Date, default: Date.now }
});

function imgLimit(val) {
    return val.length <= 4;
}

const Products = mongoose.model('product', ProductSchema);

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

app.post('/update-user-info', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Not authenticated');
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const user = await User.findById(decoded._id);
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.description = req.body.description;
        await user.save();
        res.status(200).send('User info updated');
    } catch (err) {
        res.status(401).send('Invalid token');
    }
});

app.get('/get-user-products', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Not authenticated');
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const userId = decoded._id;
        const products = await Products.find({ sellerId: userId });
        res.status(200).send(products);
    } catch (err) {
        res.status(401).send('Invalid token');
    }
});

app.post('/add-product', upload.single('images'), async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Not authenticated');
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const userId = decoded._id;
        const user = await User.findById(userId);
        const userName = user.name;
        const productId = uuidv4();
        const time = Date.now();
        const { name, price, description, productStatus } = req.body;
        const imagePath = req.file.filename; // Get the path of the uploaded file
        const product = new Products({ productId, name, price, description, productStatus: productStatus, sellerId: userId, sellerName: userName, images: imagePath, time }); // Save the file path instead of the image data
        await product.save();
        res.status(200).send('Product added');
    } catch (err) {
        res.status(401).send('Invalid token');
    }
});

app.get('/get-products-list', async (req, res) => {
    try {
        const products = await Products.find();
        console.log(products);
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send('Products not found');
    }
});