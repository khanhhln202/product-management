const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");

// [GET] /admin/my-account/
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index", {
        pageTitle: "Personal information",
    })
};

// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit", {
        pageTitle: "Edit personal information",
    })
};

// [PATCH] /admin/my-account/edit
module.exports.edit_patch = async (req, res) => {
    const id = res.locals.user.id;

    const emailExist = await Account.findOne({
        _id: { $ne: id }, // Exclude the current account ($ne: not equal)
        email: req.body.email,
        deleted: false,
    })

    if (emailExist) {
        req.flash("error", "Email already exists!");
        return res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`);
    } else {
        if(req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;
        }
    
        try {
            await Account.updateOne(
                { _id: id },
                req.body 
            )
    
            req.flash("success", "Update account successfully!");
            res.redirect("back");
    
        } catch (error) {
            req.flash("error", "Update account failed!");
            res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`);
        }
    }
};