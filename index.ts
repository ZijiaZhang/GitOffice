import {APIRouter} from "./src/backend/APIRouter";


import * as express from "express";
import * as passport from "passport";
import {ensureAuthenticated} from "./src/backend/util";
import {NextFunction, Request, Response} from "express-serve-static-core";

const bodyParser = require("body-parser");
const path = require('path')
const cookieParser = require("cookie-parser");
const session = require("express-session")
const GitHubStrategy = require("passport-github").Strategy

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GITHUB_CALLBACK_URL = "http://localhost:8000/api/v1/login/github/callback"

declare global {
    namespace Express {
        interface User {
            [index: string]:any;
        }
    }
}

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(obj, done) {
    done(null, obj)
})

passport.use(
    new GitHubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: GITHUB_CALLBACK_URL
        }, function (accessToken, refreshToken, profile, cb) {
            // console.log({ accessToken, refreshToken, profile });
            // User.findOrCreate({ githubId: profile.id }, function (err, user) {
            //     return cb(err, user);
            // });
            cb(null, {profile, accessToken, refreshToken});
        }
    )
)

const app = express()



app.use(
    session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use('/api', APIRouter);


app.get("/test-login", ensureAuthenticated, (req, res) => {
    res.send(`<h2>yo ${JSON.stringify(req.user)}</h2>`)
})

class NoAuthError{
    msg: any;
    constructor(message) {
        this.msg = message;
    }
}

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    let error = new NoAuthError("Not Logged in");
    return next(error);
    }, (req, res, next) => res.sendFile(path.join(__dirname, 'public', 'loggedin.html')))

app.use(errorHandeler)

function errorHandeler(err: any, req: Request, res: Response, next: NextFunction){
    if (err instanceof NoAuthError) {
        if(req.path !== '/' && req.path !== '/login' ){
            return res.redirect('/')
        }
        return res.status(200).sendFile(path.join(__dirname, 'public', 'notloggedin.html'))
    }
    res.status(500).json(err);
}



app.listen(8000);