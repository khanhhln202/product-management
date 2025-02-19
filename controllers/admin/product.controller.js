const Product = require("../../models/product.model");
const DummyProduct = require("../../models/dummy-products");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

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

  const dummyProducts = await DummyProduct.find(find);

  // console.log(dummyProducts);

  res.render("admin/pages/products/index", {
    pageTitle: "Products list",
    dummyProducts: dummyProducts,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
