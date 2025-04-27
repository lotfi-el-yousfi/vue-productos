// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors({origin: '*'}));
app.use(bodyParser.json());

// In-memory "database"
const users = [{id: 1, username: 'admin', password: 'admin'}];
const tokens = new Set();
const products = [
    {
        id: 1,
        name: 'Laptop',
        price: 1200,
        description: 'A brand new laptop',
        quantity: 10,
        image: 'https://picsum.photos/200/300'
    },
    {
        id: 2,
        name: 'Phone',
        price: 800,
        description: 'A brand new phone',
        quantity: 20,
        image: 'https://picsum.photos/200/300?2'
    },
    {
        id: 3,
        name: 'Watch',
        price: 150,
        description: 'A brand new watch',
        quantity: 5,
        image: 'https://picsum.photos/200/300?3'
    },
    {
        id: 4,
        name: 'Tablet',
        price: 500,
        description: 'A brand new tablet',
        quantity: 15,
        image: 'https://picsum.photos/200/300?4'
    },
    {
        id: 5,
        name: 'TV',
        price: 3000,
        description: 'A brand new TV',
        quantity: 2,
        image: 'https://picsum.photos/200/300?5'
    }
];

const SECRET_KEY = 'your_secret_key';

// Auth middleware
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({message: 'No token provided'});

    const token = authHeader.split(' ')[1];
    if (!token || !tokens.has(token)) {
        return res.status(403).json({message: 'Invalid or expired token'});
    }

    try {
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.status(403).json({message: 'Token verification failed'});
    }
}

// Login route
app.post('/auth/login', (req, res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({message: 'Invalid credentials'});
    }

    const token = jwt.sign({userId: user.id, username: user.username}, SECRET_KEY, {expiresIn: '1h'});
    tokens.add(token);
    res.json({token});
});

// Register route
app.post('/auth/register', (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required'});
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({message: 'Username already exists'});
    }

    const newUser = {
        id: users.length + 1,
        username,
        password
    };
    users.push(newUser);
    const token = jwt.sign({userId: newUser.id, username: newUser.username}, SECRET_KEY, {expiresIn: '1h'});
    tokens.add(token);
    res.status(201).json({token});
});

// Logout
app.post('/auth/logout', authenticate, (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    tokens.delete(token);

    res.json({message: 'Logged out successfully'});
});

// Protected route example
app.get('/protected', authenticate, (req, res) => {
    res.json({message: `Hello ${req.user.username}, you are authorized.`});
});

// CRUD for products
app.get('/products', authenticate, (req, res) => {
    res.json(products);
});

app.get('/products/:id', authenticate, (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({message: 'Product not found'});
    res.json(product);
});

app.post('/products', authenticate, (req, res) => {
    const {name, price} = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', authenticate, (req, res) => {
    const {name, price} = req.body;
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({message: 'Product not found'});

    product.name = name || product.name;
    product.price = price || product.price;

    res.json(product);
});

app.delete('/products/:id', authenticate, (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: 'Product not found'});

    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
});

app.listen(PORT, () => {
    console.log(`Fake auth server running at http://localhost:${PORT}`);
});