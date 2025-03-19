module.exports.login_post = async (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", "Email is required!");
        res.redirect("back");
        return;
    }

    
    if(!req.body.password) {
        req.flash("error", "Please fill your password!");
        res.redirect("back");
        return;
    }

    next();
}