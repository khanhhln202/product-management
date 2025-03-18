const mongoose = require('mongoose');
const generateToken = require('../helpers/generateToken');

const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generateToken.generateRandomString(32)
    },
    phone: String,
    address: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {timestamps: true});

const Account = mongoose.model('Account', accountSchema, 'accounts');

module.exports = Account;