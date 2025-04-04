const DummyProduct = require("../../models/dummy-products");
const ProductCategory = require("../../models/product-categories.model");

const productsHelper = require("../../helpers/products");
const productCategoriesHelper = require("../../helpers/product-categories");

// [GET] /products
module.exports.index = async (req, res) => {
  const dummyProducts = await DummyProduct.find({
    status: "active",
    delete: false,
  }).sort({ position: "desc" });

  const newProduct = productsHelper.priceNew(dummyProducts);

  res.render("client/pages/products/index", {
    pageTitle: "Products page",
    dummyProducts: newProduct,
  });
};

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const findProduct = {
      delete: false,
      status: "active",
      slug: req.params.slug, // req.params.slug get from router.get('/:slug', controller.detail);
    };

    const dummyProduct = await DummyProduct.findOne(findProduct);

    res.render("client/pages/products/detail", {
      pageTitle: dummyProduct.title,
      dummyProduct: dummyProduct,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};

// [GET] /products/:categorySlug
module.exports.category = async (req, res) => {
  try {
    const categorySlug = req.params.categorySlug;
    const findCategory = {
      slug: categorySlug,
      status: "active",
      deleted: false,
    };
    const category = await ProductCategory.findOne(findCategory);

    // Get sub categories
    const listSubCategory = await productCategoriesHelper.getSubCategory(category.id);
    const listSubCategoryId = listSubCategory.map((item) => item.id); // Get all sub category ids

    const products = await DummyProduct.find({
      delete: false,
      status: "active",
      product_category_id: {$in: [category.id, ...listSubCategoryId]}, // Get products of category and sub categories
    }).sort({ position: "desc" });

    const newProducts = productsHelper.priceNew(products);

    res.render("client/pages/products/index", {
      pageTitle: category.title,
      dummyProducts: newProducts,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};
