const express = require('express');
const bodyParser = require("body-parser");
const path = require('path')
const cookieParser = require("cookie-parser");
// const sessionMiddleWare = require("express-session");

const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(sessionMiddleWare);


app.use(express.static('public'))
app.use((req, res, next) => res.sendFile(path.join(__dirname, 'public', 'index.html')))

app.use('/api', )

app.use((req, res, next) =>
    {
        if (req.statusCode === 404){
            res.sendFile(path.join(__dirname, 'public', 'index.html'))
        }
    }
)

app.listen(8000);