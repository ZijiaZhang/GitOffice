import * as express from "express";
import * as passport from "passport";


export const loginRouter = express.Router();

loginRouter.get(
    "/github",
    passport.authenticate("github", { scope: ["repo"] }), /// Note the scope here
    function(req, res) { }
)

loginRouter.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    function(req, res) {
        res.redirect("/")
    }
)
