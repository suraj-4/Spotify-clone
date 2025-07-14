const express = require('express');
const passport = require('passport');
const Playlist = require('../models/Playlist');
const Song = require('../models/Song'); 
const User = require('../models/User');


const router = express.Router();

// Create a new playlist
router.post('/create', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const currentUser = req.user;
    const { playlistName, thumbnail, songs } = req.body;
    if (!playlistName || !thumbnail || !songs) {
        return res.status(301).json({ err: 'Insufficient data' });
    }
    try {
        const newPlaylist = new Playlist({
            playlistName,
            thumbnail,
            songs,
            owner: currentUser._id,
            collaborators: []
        });
        await newPlaylist.save();
        res.status(201).json({newPlaylist, message: 'Playlist created successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error creating playlist', error });
    }
});

// Get a playlists by ID
router.get('/get-ById/:playlistId', passport.authenticate('jwt', {session:false}),async (req, res) => {
    const playlistId = req.params.playlistId;
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Invalid playlist Id' });
        }
        res.status(200).json({playlist, message: 'Playlist found Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlist', error });
    }
});

// Get all playlists 
router.get('/get/me', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const artistId = req.user._id;
    try {
        const playlists = await Playlist.find({ owner: artistId }).populate("owner");
        if (!playlists || playlists.length === 0) {
            return res.status(404).json({ message: 'No playlists found for this artist' });
        }
        res.status(200).json({playlists, message: 'Playlists found' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlists', error });
    }
});

// Get all playlists made by an Artist ID
router.get('/get/artist/:artistId', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const artistId = req.params.artistId;
    try {
        const artist = await User.findById(artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        const playlists = await Playlist.find({ owner: artistId });
        if (!playlists || playlists.length === 0) {
            return res.status(404).json({ message: 'No playlists found for this artist' });
        }
        res.status(200).json({playlists, message: 'Playlists found' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlists', error });
    }
});


// Add a song to a playlist
router.post('/add/song',passport.authenticate('jwt', {session : false}), async(req,res)=>{
    const currentUser = req.user;
    try{
        const { playlistId, songId } = req.body;

        if (!playlistId || !songId) {
        return res.status(400).json({ error: 'Playlist ID and Song ID are required' });
        }

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
        return res.status(404).json({ error: 'Playlist does not exist' });
        }

        // Check ownership or collaboration
        const isOwner = playlist.owner.equals(currentUser._id);
        const isCollaborator = playlist.collaborators.includes(currentUser._id);

        if (!isOwner && !isCollaborator) {
        return res.status(403).json({ error: 'Access denied' });
        }

        const song = await Song.findById(songId);
        if (!song) {
        return res.status(404).json({ error: 'Song does not exist' });
        }

        // Add song if not already present
        if (playlist.songs.includes(songId)) {
        return res.status(409).json({ error: 'Song already exists in playlist' });
        }

        playlist.songs.push(songId);
        await playlist.save();

        return res.status(200).json({ message: 'Song added to playlist successfully' });

    }catch (error) {
        res.status(500).json({ message: "Failed to add song to playlist", error });
    }


});
module.exports = router;