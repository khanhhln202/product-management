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

  // Pagination
  let objPagination = {
    currentPage: 1,
    limitItems: 4
  };

  if (req.query.page) {
    objPagination.currentPage = parseInt(req.query.page);
  }

  objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItems;

  const countProducts = await DummyProduct.countDocuments(find);
  objPagination.totalItems = countProducts;
  objPagination.totalPages = Math.ceil(countProducts / objPagination.limitItems);
  // End of pagination

  const dummyProducts = await DummyProduct.find(find).limit(objPagination.limitItems).skip(objPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Products list",
    dummyProducts: dummyProducts,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objPagination 
  });
};
