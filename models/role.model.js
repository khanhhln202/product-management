// Import mongoose library to define schema and interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for products, describing the structure of each document
const roleSchema = new mongoose.Schema({
  title: String,
  description: String,
  permissions: {
    type: Array,
    default: []
  },
  delete: {
    type: Boolean, 
    default: false // Default value for the field if not provided
  },
  deletedAt: Date
},
{
  timestamps: true // Automatically add createdAt and updatedAt fields
});


// Create a model for the schema, linking it to the "dummy-products" collection in MongoDB
// `mongoose.model(name, schema, collection)` connects the model to the specific collection
const Role = mongoose.model("Role", roleSchema, "roles");

// Export the model for use in other parts of the application
module.exports = Role;
// Import mongoose library to define schema and interact with MongoDB