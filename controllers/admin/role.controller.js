const Role = require("../../models/role.model");

const systemConfig = require("../../config/system");

// [GET] /admin/roles/
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    const roles = await Role.find(find);

    res.render("admin/pages/roles/index", {
        pageTitle: "Permissions",
        roles: roles,
    });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false,
    };
    const roles = await Role.find(find);

    res.render("admin/pages/roles/create", {
        pageTitle: "Create Permissions",
    });
}

// [GET] /admin/roles/create_post
module.exports.create_post = async (req, res) => {
    const role = new Role(req.body); // req.body is the data sent to the server by the client.
    await role.save(); // Save the new role to the database.

    req.flash("success", "Create new role successfully!");
    res.redirect(`${systemConfig.prefixAdmin}/roles/create`);
};
