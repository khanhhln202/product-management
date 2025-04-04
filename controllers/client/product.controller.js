const DummyProduct = require("../../models/dummy-products");
const Product = require("../../models/dummy-products")

const productsHelper = require("../../helpers/products");

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    const dummyProducts = await DummyProduct.find({
        status: "active",
        delete: false
    }).sort({position: "desc"});

    const newProduct = productsHelper.priceNew(dummyProducts);

    res.render("client/pages/products/index", {
        pageTitle: "Products page",
        products: products,
        dummyProducts: newProduct
    });

}

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

}