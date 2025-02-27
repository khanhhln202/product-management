const Product = require("../../models/product.model");
const DummyProduct = require("../../models/dummy-products");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

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
      break;
    case "inactive":
      await DummyProduct.updateMany(
        { _id: { $in: ids } },
        { status: "inactive" }
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

  await DummyProduct.deleteOne({ _id: id });

  res.redirect("back");
};
