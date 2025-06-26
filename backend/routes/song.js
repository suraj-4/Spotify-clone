const express = require('express');
const router = express.Router();
const passport = require('passport');
const Song = require('../models/Song'); 
const User = require('../models/User');
const { getToken } = require('../utils/helper');

// create song route
router.post('/create', passport.authenticate("jwt",{session : false}),async (req, res) => {
    const {songName, track, thumbnail} = req.body;
    if (!songName || !track || !thumbnail) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const artist = req.user._id;
    const songDetails = { songName, track, thumbnail, artist };
    try {
        const createdSong = await Song.create(songDetails);
        res.status(201).json({ createdSong, message: "Song created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating song", error });
    }
});

// Get route to get all songs i have published
router.get('/all-songs', passport.authenticate("jwt",{session : false}), async (req, res) => {
    try {
        const songs = await Song.find({ artist: req.user._id }).populate("artist").sort({ createdAt: -1 });;
        res.status(200).json({getAllSongs : songs, message: "Songs fetched successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error fetching songs", error });
    }
});  

// Get route to get songs any artist has published
router.get('/artist/:artistId', passport.authenticate("jwt",{session : false}), async (req, res) => {
    const {artistId} = req.params;
    const artist = await User.find({ _id: artistId });
    if (!artist) {
        return res.status(301).json({ message: "Artist not found" });
    }
    try {
        const songs = await Song.find({ artist: artistId });
        if (!songs || songs.length === 0) {
            return res.status(200).json({  songs: [], message: 'No songs found' });
        }
        res.status(200).json({ getAllSongs: songs, message: "Songs fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching songs", error });
    }   
});

// Get route to get single songs by name
router.get('/songname/:songName', passport.authenticate("jwt",{session : false}), async (req, res) => {
    const { songName } = req.params;
    try {
        //pattern matching instead of exact name matching
        const song = await Song.find({ songName: { $regex: songName, $options: 'i' } }).populate("artist");
        
        // const song = await Song.find({ songName: songName }).populate("artist");
        if (!song || song.length === 0) {
            return res.status(404).json({ message: "Song not found" });
        }
        res.status(200).json({ getSong: song, message: "Song fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching song", error });
    }
});



module.exports = router;