const DummyProduct = require("../../models/dummy-products");
const ProductCategory = require("../../models/product-categories.model");
const Account = require("../../models/account.model");

const systemConfig = require("../../config/system");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const createTreeHelper = require("../../helpers/createTree");

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

  // Sort
  let sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort = { position: "desc" };
  }
  // End of sort

  const dummyProducts = await DummyProduct.find(find)
    .sort(sort)
    .limit(objPagination.limitItems)
    .skip(objPagination.skip); // Skip the first n items and return the rest of the items from the collection


  for (const item of dummyProducts) {
    // Add createdBy
    const user = await Account.findOne({ _id: item.createdBy.account_id });

    if (user) {
      item.authorName = user.fullName;
    } else {
      item.authorName = "Unknown";
    }

    // Add updatedBy
    // const updateBy = item.updatedBy[item.updatedBy.length-1];
    const lastUpdatedBy = item.updatedBy.slice(-1)[0];
    if(lastUpdatedBy){
      const updater = await Account.findOne({_id : lastUpdatedBy.account_id})
      // item.updatedBy.slice(-1)[0].updaterFullName = updater.fullName;
      lastUpdatedBy.updaterFullName = updater.fullName;
    }
    console.log(item);
  }

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

  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };
  
  await DummyProduct.updateOne({ _id: id }, { 
    status: status,
    $push: { updatedBy: updatedBy }
  });

  req.flash("success", "Change status successfully!");

  res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");

  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };

  switch (type) {
    case "active":
      await DummyProduct.updateMany(
        { _id: { $in: ids } },
        { status: "active", $push: { updatedBy: updatedBy } }
      );
      req.flash(
        "success",
        `Change status of ${ids.length} items successfully!`
      );
      break;
    case "inactive":
      await DummyProduct.updateMany(
        { _id: { $in: ids } },
        { status: "inactive", $push: { updatedBy: updatedBy } }
      );
      req.flash(
        "success",
        `Change status of ${ids.length} items successfully!`
      );
      break;
    case "delete-all":
      await DummyProduct.updateMany(
        { _id: { $in: ids } },
        { delete: true, deletedBy: { account_id: res.locals.user.id , deletedAt: new Date(),} }
      );
      req.flash("success", `Delete ${ids.length} items successfully!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await DummyProduct.updateOne({ _id: id }, { position: position, $push: { updatedBy: updatedBy } });
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
    { delete: true, deletedBy: { account_id: res.locals.user.id , deletedAt: new Date(),} }
  ); // Soft delete

  req.flash("success", "Delete item successfully!");

  res.redirect("back");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const productCategories = await ProductCategory.find(find);

  const newProductCategories = createTreeHelper.tree(productCategories);

  res.render("admin/pages/products/create", {
    pageTitle: "Create new product",
    categories: newProductCategories,
  });
};

// [POST] /admin/products/create_post
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

  // Set createdBy
  req.body.createdBy = {
    account_id: res.locals.user.id,
  };

  // Set the path to the uploaded file
  // `thumbnail` is a custom property added to `req.body`
  // This is necessary to include the path to the uploaded file as part of the product data
  // if (req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`;
  // }

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

    const productCategories = await ProductCategory.find({ deleted: false });

    const newProductCategories = createTreeHelper.tree(productCategories);

    res.render("admin/pages/products/edit", {
      pageTitle: "Edit the product",
      dummyProduct: dummyProduct,
      categories: newProductCategories,
    });
  } catch (error) {
    req.flash("error", "Product not found!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [PATCH] /admin/products/edit_patch/:id
// The data that was sent is in the request body, so we can access it using req.body
module.exports.edit_patch = async (req, res) => {
  // Convert properties to integers to ensure correct data types
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  // Set the path to the uploaded file
  // if (req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`;
  // }

  try {
    const updatedBy  = {
      account_id: res.locals.user.id,
      updatedAt: new Date(),
    }
    // Update the product data
    await DummyProduct.updateOne({ _id: req.params.id }, {
      ...req.body, // Spread the properties from req.body to update the product data
      $push: { updatedBy : updatedBy }
    });

    req.flash("success", "Update product successfully!");
    res.redirect(`${systemConfig.prefixAdmin}/products/edit/${req.params.id}`);
  } catch (error) {
    req.flash("error", "There are some error when updating!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const findProduct = {
      _id: req.params.id,
      delete: false,
    };

    const dummyProduct = await DummyProduct.findOne(findProduct);

    res.render("admin/pages/products/detail", {
      pageTitle: dummyProduct.title,
      dummyProduct: dummyProduct,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
