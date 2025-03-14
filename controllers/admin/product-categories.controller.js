const ProductCategory = require("../../models/product-categories.model");

const systemConfig = require("../../config/system");

// [GET] /admin/product-categories/
module.exports.index = async (req, res) => {
    let find = {
        deleted : false,
    }

    const productCategories = await ProductCategory.find(find).sort({position: "asc"});

    res.render("admin/pages/product-categories/index", {
        pageTitle: "Product Categories",
        productCategories: productCategories,
    });
}

// [GET] /admin/product-categories/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/product-categories/create", {
        pageTitle: "Create Product Categories",       
    });
}

// [POST] /admin/product-categories/create_post
module.exports.create_post = async (req, res) => {
    if(req.body.position == "") {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const productCategory = new ProductCategory(req.body);
    await productCategory.save();

    req.flash("success", "Create new product category successfully!");
    res.redirect(`${systemConfig.prefixAdmin}/product-categories/create`);
    
}