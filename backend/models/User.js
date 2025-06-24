const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    likeSongs: {
        type: String,
        default: '',
    },
    likePlayLists: {
        type: String,
        default: '',
    },
    subscribedArtists: {
        type: String,
        default: '',
    },
});

// Prevent OverwriteModelError
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = UserModel;
