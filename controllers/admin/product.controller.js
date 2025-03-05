const Product = require("../../models/product.model");
const DummyProduct = require("../../models/dummy-products");

const systemConfig = require("../../config/system");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const e = require("express");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // Filter
  const filterStatus = filterStatusHelper(req.query);

  // Find object
  let find = {
    delete: false,
  };

  // Status
  if (req.query.status) {
    find.status = req.query.status;
  }

  // Search
  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Pagination
  const countProducts = await DummyProduct.countDocuments(find);

  let objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );
  // End of pagination

  const dummyProducts = await DummyProduct.find(find)
    .sort({ position: "desc" })
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Products list",
    dummyProducts: dummyProducts,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objPagination,
  });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;

  await DummyProduct.updateOne({ _id: id }, { status: status });

  req.flash("success", "Change status successfully!");

  res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");

  switch (type) {
    case "active":
      await DummyProduct.updateMany(
        { _id: { $in: ids } },
        { status: "active" }
      );
      req.flash(
        "success",
        `Change status of ${ids.length} items successfully!`
      );
      break;
    case "inactive":
      await DummyProduct.updateMany(
        { _id: { $in: ids } },
        { status: "inactive" }
      );
      req.flash(
        "success",
        `Change status of ${ids.length} items successfully!`
      );
      break;
    case "delete-all":
      await DummyProduct.updateMany(
        { _id: { $in: ids } },
        { delete: true, deletedAt: new Date() }
      );
      req.flash("success", `Delete ${ids.length} items successfully!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await DummyProduct.updateOne({ _id: id }, { position: position });
      }
      req.flash(
        "success",
        `Change position of ${ids.length} items successfully!`
      );
      break;
    default:
      break;
  }

  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await DummyProduct.deleteOne({ _id: id }); // Hard delete
  await DummyProduct.updateOne(
    { _id: id },
    { delete: true, deletedAt: new Date() }
  ); // Soft delete

  req.flash("success", "Delete item successfully!");

  res.redirect("back");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Create new product",
  });
};

// [POST] /admin/products/create
module.exports.create_post = async (req, res) => {
  // Convert properties to integers to ensure correct data types
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProducts = await DummyProduct.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  // Set the path to the uploaded file
  // `thumbnail` is a custom property added to `req.body`
  // This is necessary to include the path to the uploaded file as part of the product data
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  // Create a new instance of the DummyProduct model with the data from req.body
  const newProduct = new DummyProduct(req.body);
  await newProduct.save();

  req.flash("success", "Create new product successfully!");
  res.redirect(`${systemConfig.prefixAdmin}/products/create`);
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const findProduct = {
      _id: req.params.id,
      delete: false,
    };

    const dummyProduct = await DummyProduct.findOne(findProduct);

    res.render("admin/pages/products/edit", {
      pageTitle: "Edit the product",
      dummyProduct: dummyProduct,
    });
  } catch (error) {
    req.flash("error", "Product not found!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [PATCH] /admin/products/edit/:id
// The data that was sent is in the request body, so we can access it using req.body
module.exports.edit_patch = async (req, res) => {
  // Convert properties to integers to ensure correct data types
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  // Set the path to the uploaded file
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    // Update the product data
    await DummyProduct.updateOne({ _id: req.params.id }, req.body);

    req.flash("success", "Update product successfully!");
    res.redirect(`${systemConfig.prefixAdmin}/products/edit/${req.params.id}`);
  } catch (error) {
    req.flash("error", "There are some error when updating!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
