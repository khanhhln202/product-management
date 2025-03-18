const md5 = require("md5"); // Import md5 module
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const accounts = await Account.find(find).select("-password -token");

  for (const account of accounts) {
    account.role = await Role.findById({ _id: account.role_id, deleted: false });
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "List of accounts",
    accounts: accounts,
  });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const roles = await Role.find(find);

  res.render("admin/pages/accounts/create", {
    pageTitle: "Create new account",
    roles: roles,
  });
};

// [POST] /admin/accounts/create
module.exports.create_post = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", `Email ${req.body.email} already exists!`);
    res.redirect("back");
  } else if (req.body.password !== req.body.passwordConfirm) {
    req.flash("error", "Password and confirm password do not match!");
    res.redirect("back");
    return;
  } else if (req.body.password.length < 6) {
    req.flash("error", "Password must be at least 6 characters!");
    res.redirect("back");
    return;
  } else {
    req.body.password = md5(req.body.password); // Hash password

    const account = new Account(req.body);

    await account.save();

    req.flash("success", "Create account successfully!");

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
