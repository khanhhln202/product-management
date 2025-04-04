const DummyProduct = require("../../models/dummy-products");

const productsHelper = require("../../helpers/products");

// [GET] /
module.exports.index = async (req, res) => {
  // Get featured products
  const featuredProducts = await DummyProduct.find({
    status: "active",
    delete: false,
    featured: "1",
  }).sort({ position: "desc" }).limit(6); 

  const newProduct = productsHelper.priceNew(featuredProducts);

  res.render("client/pages/home/index", {
    pageTitle: "Home page",
    featuredProducts: newProduct,
  });
};
