const ProductCategory = require("../models/product-categories.model");

module.exports.getSubCategory = async (parentId) => {
const getCategory = async (parentId) => {
  const subs = await ProductCategory.find({
    parent_id: parentId,
    status: "active",
    deleted: false,
  });

  let allSub = [...subs]; // Get all sub categories

  for (const sub of subs) {
    const childs = await getCategory(sub.id); // Get sub categories of sub categories
    allSub = await allSub.concat(childs); // Concatenate all sub categories
  }

  return allSub;
}
  return result = await getCategory(parentId); // Get all sub categories
};
