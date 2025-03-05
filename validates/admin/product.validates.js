// The create_post middleware validates the form data before processing it. If the form data is invalid, the user will be redirected back to the form. If the form data is valid, the user will be redirected to the product list page.
module.exports.create_post = (req, res, next) => { 
    if(!req.body.title){
        req.flash("error", "Please fill in all fields!");
        res.redirect("back");
        return;
      }

    next(); // next() is a function that passes control to the next middleware function.
}