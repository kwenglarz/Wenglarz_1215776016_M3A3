// require express use or import express

const express = require('express');
const app = express();

const welcomeMiddleware = (req, res, next) => {
    console.log('Welcome to my website');
    if(req.welcome==undefined){
        req.welcome = 'Welcome to my website';
    }
    next();
}

const checkAdmin = (req, res, next) => {
    if(req.query.admin === 'true') {
        next();
    } else {
        var message = req.welcome + ' You are not an admin';
        res.status(400).send('Should be admin');
    }
}

app.use(welcomeMiddleware);
app.use(checkAdmin);


app.get('/', (req, res) => {
    res.send('Hello World');
})

//start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
