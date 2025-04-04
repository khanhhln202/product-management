// Import mongoose library to define schema and interact with MongoDB
const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug); // Apply slug plugin to mongoose

// Define the schema for products, describing the structure of each document
const productSchema = new mongoose.Schema(
  {
    title: String,
    product_category_id: { type: String, default: "" },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    featured: String,
    position: Number,
    slug: { type: String, slug: "title", slug_padding_size: 1, unique: true },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    delete: {
      type: Boolean,
      default: false, // Default value for the field if not provided
    },
    // deletedAt: Date
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a model for the schema, linking it to the "dummy-products" collection in MongoDB
// `mongoose.model(name, schema, collection)` connects the model to the specific collection
const DummyProduct = mongoose.model(
  "dummyProduct",
  productSchema,
  "dummy-products"
);

// Export the model for use in other parts of the application
module.exports = DummyProduct;
