const ProductCategory = require("../../models/product-categories.model");

const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/createTree");

// [GET] /admin/product-categories/
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const productCategories = await ProductCategory.find(find);

  const newProductCategories = createTreeHelper.tree(productCategories);

  res.render("admin/pages/product-categories/index", {
    pageTitle: "Product Categories",
    productCategories: newProductCategories,
  });
};

// [GET] /admin/product-categories/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const productCategories = await ProductCategory.find(find);

  const newProductCategories = createTreeHelper.tree(productCategories);

  res.render("admin/pages/product-categories/create", {
    pageTitle: "Create Product Categories",
    productCategories: newProductCategories,
  });
};

// [POST] /admin/product-categories/create_post
module.exports.create_post = async (req, res) => {
  const permissions = res.locals.role_auth.permissions; // permissions is an array of permissions

  if (permissions.includes("products-category_create")) {
    if (req.body.position == "") {
      const count = await ProductCategory.countDocuments();
      req.body.position = count + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }

    const productCategory = new ProductCategory(req.body);
    await productCategory.save();

    req.flash("success", "Create new product category successfully!");
    res.redirect(`${systemConfig.prefixAdmin}/product-categories/create`);
  } else {
    res.send("403 Forbidden! You don't have permission to access this page.");
    return;
  }
};

// [GET] /admin/product-categories/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const productCategory = await ProductCategory.findOne({
      _id: id,
      deleted: false,
    });

    const productCategories = await ProductCategory.find({ deleted: false });

    const newProductCategories = createTreeHelper.tree(productCategories);

    res.render("admin/pages/product-categories/edit", {
      pageTitle: "Edit Product Categories",
      productCategory: productCategory,
      productCategories: newProductCategories,
    });
  } catch (error) {
    req.flash("error", "Product category not found!");
    res.redirect(`${systemConfig.prefixAdmin}/product-categories`);
  }
};

// [PATCH] /admin/product-categories/edit/:id
module.exports.edit_patch = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);

    await ProductCategory.updateOne(
      {
        _id: id,
      },
      req.body
    );

    req.flash("success", "Update product category successfully!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Product category not found!");
    res.redirect(`${systemConfig.prefixAdmin}/product-categories`);
  }
};
