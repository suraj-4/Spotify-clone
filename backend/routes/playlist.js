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
    const {playlistId, songsId} = req.body;
    const playlist = await Playlist.findOne({_id:playlistId});
    if (!playlist){
        res.status(304).json({err: 'Playlists does not exist' });
    }
    if (!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)){
        res.status(400).json({err: 'Not Allowed' });
    }
    const song = await Song.findOne({_id:songsId});
    if (!song){
        res.status(304).json({err: 'Song does not exist' });
    }
    playlist.songs.push(songsId);
    await playlist.save();
    res.status(200).json({playlist, message: 'Created playlist with song Successfully' });
});
module.exports = router;