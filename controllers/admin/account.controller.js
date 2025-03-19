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
  } else {
    req.body.password = md5(req.body.password); // Hash password

    const account = new Account(req.body);

    await account.save();

    req.flash("success", "Create account successfully!");

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false,
  };

  try {
    const account = await Account.findOne(find);

    const roles = await Role.find({ deleted: false });

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Edit account",
      account: account,
      roles: roles,
    });
  } catch (error) {
    req.flash("error", "Account not found!");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

// [PATCH] /admin/accounts/edit/:id
module.exports.edit_patch = async (req, res) => {
  const emailExist = await Account.findOne({
    _id: { $ne: req.params.id }, // Exclude the current account ($ne: not equal)
    email: req.body.email,
    deleted: false,
  })

  if (emailExist) {
    req.flash("error", `Email ${req.body.email} already exists!`);
    res.redirect("back");
  } else {
    if(req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
  
    try {
      await Account.updateOne(
        { _id: req.params.id },
        req.body 
      )
  
      req.flash("success", "Update account successfully!");
      res.redirect("back");
  
    } catch (error) {
      req.flash("error", "Update account failed!");
      res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
  }

};