const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    following: [{
        type: String,
        ref: 'Users'
    }],
    followers: [{
        type: String,
        ref: 'Users'
    }],
    profilepic: {
        type: String
    },
    blogs: [{
        type: String,
        ref: 'Blogs' 
    }],
    badgecolor: {
        type: String,
        required: true,
        default:'bg-blue-800' 
    }
}, {
    timestamps: true
});

const Users = mongoose.models.Users || mongoose.model('Users', userSchema);

module.exports = Users;
