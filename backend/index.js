//const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');

require('dotenv').config();
require('./websocketServer');

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

})

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String , default: '' }
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
    images: { type: [String], default: ['2024-08-09T09-18-05.557Zpixai-1754766906462055083-1.png'],validate: [imgLimit, '{PATH} exceeds the limit of 4'] },
    time: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    productType: { type: String, default: '', required: true }

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
    const token = jwt.sign({ _id: user.userId }, jwtSecretKey, { expiresIn: '1h' });
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
        const user = await User.findOne({ userId: decoded._id });
        res.status(200).send(user);
    } catch (err) {
        res.status(401).send('Invalid token');
    }
});

app.post('/update-user-info', upload.single('icon'), async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Not authenticated');
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const user = await User.findOne({ userId: decoded });
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.description = req.body.description;
        
        if (!req.file) {
            console.log('Image is required',req.body);
            return res.status(400).send('Image is required');
        }
        const imagePath = req.file.filename; 
        user.icon = imagePath;
        await user.save();

        const sellerName = await Products.updateMany(
            { sellerId: user.userId },
            { $set: { sellerName: user.name } }
        );
        console.log(sellerName);

        res.status(200).send('User info updated');
    } catch (err) {
        console.log(err.message);
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
        const products = await Products.find({ sellerId: decoded._id });
        res.status(200).send(products);
    } catch (err) {
        res.status(401).send('Invalid token');
    }
});

app.post('/add-product', upload.single('images'), async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        console.log('Not authenticated');
        return res.status(401).send('Not authenticated');
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const userId = decoded._id;
        const user = await User.findOne({ userId: userId });
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        const { name, price, description, productStatus, productType } = req.body;
        if (!name || !price || !description || !productStatus || !productType) {
            console.log('All fields are required');
            return res.status(400).send('All fields are required');
        }

        if (!req.file) {
            console.log('Image is required');
            return res.status(400).send('Image is required');
        }

        const productId = uuidv4();
        const time = Date.now();
        const imagePath = req.file.filename; // Get the path of the uploaded file

        const product = new Products({
            productId,
            name,
            price,
            description,
            productStatus,
            sellerId: userId,
            sellerName: user.name,
            images: imagePath,
            time,
            productType: productType
        });
        await product.save();
        console.log('Product added');
        res.status(200).send('Product added');
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).send('Invalid token');
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send('Token expired');
        }
        if (err.name === 'ValidationError') {
            console.log('Validation error:', err.message);
            return res.status(400).send('Validation error: ' + err.message);
        }
        console.log(err.message);
        res.status(500).send('Internal server error');
    }
});

app.get('/get-products-list', async (req, res) => {
    try {
        const products = await Products.find();
        //console.log(products);
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send('Products not found');
    }
});

app.get('/get-product/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        console.log(productId);
        const product = await Products.findOne({ productId });
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send('Product not found');
    }
});

app.put('/update-product-views/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Products.findOne({ productId });
        product.views += 1;
        await product.save();
        res.status(200).send('Product views updated');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Product views not updated');
    }
});

app.delete('/delete-product/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        await Products.deleteOne({ productId });
        res.status(200).send('Product deleted');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Product not deleted');
    }
});

app.put('/update-product/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Products.findOne({ productId });
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        await product.save();
        res.status(200).send('Product updated');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Product not updated');
    }
})

app.get('/get-seller-icon/:sellerId', async (req, res) => {
    const sellerId = req.params.sellerId;
    try {
        const user = await User.findOne({ userId: sellerId });

        //console.log(user.icon,"icon");
        res.status(200).send(user);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Seller icon not found');
    }
});

app.get('/get-seller-info/:sellerId', async (req, res) => {
    const sellerId = req.params.sellerId;
    try {
        const seller = await User.findOne({ userId: sellerId });
        const sellerProducts = await Products.find({ sellerId });
        res.status(200).send({seller,sellerProducts});
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Seller info not found');
    }
});