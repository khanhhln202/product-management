// Import mongoose library to define schema and interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for products, describing the structure of each document
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  delete: Boolean,
  deletedAt: Date
});

// Create a model for the schema, linking it to the "dummy-products" collection in MongoDB
// `mongoose.model(name, schema, collection)` connects the model to the specific collection
const DummyProduct = mongoose.model("dummyProduct", productSchema, "dummy-products");

// Export the model for use in other parts of the application
module.exports = DummyProduct;