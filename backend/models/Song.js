const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track:{
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

const SongModel = mongoose.model('Song', songSchema);
module.exports = SongModel;