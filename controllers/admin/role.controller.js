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

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const findRole = {
            _id: req.params.id,
            deleted: false,
        };

    const role = await Role.findOne(findRole);

    res.render("admin/pages/roles/edit", {
        pageTitle: "Edit Permissions",
        role: role,
    });
    } catch (error) {
        req.flash("error", "Role not found!");
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}

// [PATCH] /admin/roles/edit/:id
module.exports.edit_patch = async (req, res) => {
    try {
        await Role.updateOne({ _id: req.params.id }, req.body); // Update the role data.
        req.flash("success", "Update role successfully!");
        res.redirect("back");
    } catch (error) {
        req.flash("error", "There are some error when updating!");
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}