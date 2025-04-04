const ProductCategory = require("../../models/product-categories.model");
const createTreeHelper = require("../../helpers/createTree");
const { response } = require("express");

module.exports.categoryMiddleware = async (req, res, next) => {
  let find = {
    deleted: false,
  };
  const productCategories = await ProductCategory.find(find);

  const newProductCategories = createTreeHelper.tree(productCategories);

  res.locals.layoutProductCategories = newProductCategories;

  next();
};
