const DummyProduct = require("../../models/dummy-products");

const productsHelper = require("../../helpers/products");

// [GET] /
module.exports.index = async (req, res) => {
  // Get featured products
  const featuredProducts = await DummyProduct.find({
    status: "active",
    delete: false,
    featured: "1",
  }).limit(6); 

  const newFeaturedProducts = productsHelper.priceNew(featuredProducts);

  // Get latest products
  const latestProducts = await DummyProduct.find({
    status: "active",
    delete: false,
  }).sort({ position: "desc" }).limit(6);

  const newLatestProducts = productsHelper.priceNew(latestProducts);

  res.render("client/pages/home/index", {
    pageTitle: "Home page",
    featuredProducts: newFeaturedProducts,
    latestProducts: newLatestProducts,
  });
};
