const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    playlistName: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song',
    }],
    collaborators: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

const PlaylistModel = mongoose.model('Playlist', playlistSchema);
module.exports = PlaylistModel;