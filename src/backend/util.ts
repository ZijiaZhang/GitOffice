export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req.body);
        return next()
    }
    res.redirect("/login")
}