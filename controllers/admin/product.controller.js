const Product = require("../../models/product.model");
const DummyProduct = require("../../models/dummy-products");

const filterStatusHelper = require("../../helpers/filterStatus");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // Filter
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        delete: false
    }

    if(req.query.status){
        find.status = req.query.status;
    }

    let keyword = "";
    if(req.query.keyword){
        keyword = req.query.keyword;

        // Regex
        const regex = new RegExp(keyword, "i");

        find.title = regex;
    }

    const dummyProducts = await DummyProduct.find(find);

    // console.log(dummyProducts);

    res.render("admin/pages/products/index", {
        pageTitle: "Products list",
        dummyProducts: dummyProducts,
        filterStatus: filterStatus,
        keyword: keyword
    });
}