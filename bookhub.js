const express = require('express');
const time = require('express-timestamp')
const app = express();
app.use(time.init)

// array of books objects acting as storage
const books = [];

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Global middleware function to log request method, request url, and date-time of request
const logMethod = (req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    console.log(fullUrl);
    console.log(req.method);
    console.log(req.timestamp);

    next();
}

app.use(logMethod);

// Route middleware function to check if a user is authenticated before adding/removing books from cart
const checkAdmin = (req, res, next) => {
    if(req.query.admin === 'true') {
        next();
    } else {
        res.status(400).send('Should be admin');
    }
};
const addBook = (req, res) => {
    const id = req.params.id;
    const book = books[id];
    books.push(book);
    res.send(`Book with the title ${bookTitle} added to cart`);
}
const deleteBook =  (req, res) => {
    const id = req.params.id;
    const book = books[id];
    books.splice(id, 1);
    res.send(`Book with the id ${id} has been deleted`);
}

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to BookHub!');
});

app.post('/cart/add', checkAdmin, addBook);
app.delete('/cart/remove', checkAdmin, deleteBook);

app.listen(3000, () => console.log('Server is running on port 3000'));