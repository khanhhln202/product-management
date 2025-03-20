const md5 = require("md5");

const Account = require("../../models/account.model");

const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = (req, res) => {
  if (req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  } else {
    res.render("admin/pages/auth/login", {
      pageTitle: "Login Page",
    });
  }
};

// [POST] /admin/auth/login
module.exports.login_post = async (req, res) => {
  // const { email, password } = req.body; // Destructure email and password from req.body

  const email = req.body.email;
  const password = req.body.password;

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Account not found!");
    res.redirect("back"); // Redirect to login page
    return;
  }

  if (user.password != md5(password)) {
    req.flash("error", "Password is incorrect!");
    res.redirect("back"); // Redirect to login page
    return;
  }

  if (user.status == "inactive") {
    req.flash("error", "Account is inactive!");
    res.redirect("back"); // Redirect to login page
    return;
  }

  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`); // Redirect to dashboard page
};

// [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`); // Redirect to login page
};
