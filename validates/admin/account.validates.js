module.exports.create_post = async (req, res, next) => {
    if(!req.body.fullName) {
        req.flash("error", "Full name is required!");
        res.redirect("back");
        return;
    }

    if(!req.body.email) {
        req.flash("error", "Email is required!");
        res.redirect("back");
        return;
    }

    if(!req.body.password) {
        req.flash("error", "Password is required!");
        res.redirect("back");
        return;
    }

    if(req.body.password.length < 6) { 
        req.flash("error", "Password must be at least 6 characters!");
        res.redirect("back");
        return;
    }

    if(!req.body.confirmPassword) {
        req.flash("error", "Confirm password is required!");
        res.redirect("back");
        return;
    }

    if(req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Password and confirm password do not match!");
        res.redirect("back");
        return;
    }

    if(!req.body.role_id) {
        req.flash("error", "Role is required!");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.edit_patch = async (req, res, next) => {
    if(!req.body.fullName) {
        req.flash("error", "Full name is required!");
        res.redirect("back");
        return;
    }

    if(!req.body.email) {
        req.flash("error", "Email is required!");
        res.redirect("back");
        return;
    }

    
    if(!req.body.role_id) {
        req.flash("error", "Role is required!");
        res.redirect("back");
        return;
    }

    next();
}