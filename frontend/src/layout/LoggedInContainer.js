import HeaderComponent from "./header";
import SidebarComponent from "./sidebar";
import FooterComponent from "./footer";
import AddToPlaylistModal from "../models/addToPlaylistModal"
import {Howl, Howler} from 'howler';
import { Link } from 'react-router-dom';
import { useState, useContext, useLayoutEffect, useRef } from "react";
import { useCookies } from 'react-cookie';
import SongContext from '../contexts/songContext';
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";


const LoggedInContainer = ({children}) => {
    const [cookie ,setCookie] = useCookies(["token"]);

    const { currentSong, setCurrentSong, musicPlayed, setMusicPlayed, isPause, setIsPause } = useContext(SongContext);
    const firstUpdate = useRef(true);

    useLayoutEffect(() => {

        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
    }, [currentSong && currentSong.track]);

    const addSongToPlaylist = async(playlistId) => {
        const songId = currentSong ._id
        const payload = {playlistId, songId}
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song", payload);
    };

    const playMusic = () => {
        if (!musicPlayed) {
            return;
        }
        musicPlayed.play();
    }
        
     const changeSong = (songSrc) => {
        if(musicPlayed){
            musicPlayed.stop();
        }
        let music = new Howl({
            src: [songSrc],
            html5: true
        });
        setMusicPlayed(music);
        music.play ();
        setIsPause(false);
    }

    const pauseMusic = () => {
        musicPlayed.pause();
    }

    const togglePlayPause = () => {
        if (isPause) {
            playMusic();
            setIsPause(false);
        } else {
            pauseMusic();
            setIsPause(true);
        }   
    }


    return (
        <>
        <HeaderComponent/>
        <main>
            <div className="main_wrapper">
                <SidebarComponent/>
                <div className="content_wrapper">
                    {children}
                    <FooterComponent/>
                </div>
            </div>

            {cookie.token ?(
                currentSong && (
                    <div class="playController_container">
                        <div class="left_side_wrapper">
                            <div class="playSong_wrapper">
                                <div class="playSong_img">
                                    {
                                        currentSong?.thumbnail && (
                                            <img src={currentSong.thumbnail} alt={currentSong.songName}/>
                                        )
                                    }
                                </div>
                                <div class="name_wrap_one">
                                    {
                                        currentSong?.songName && (
                                            <h6><Link to="">{currentSong.songName}</Link></h6>
                                        )
                                    }
                                    <ul>
                                        {
                                            currentSong?.artist.firstName && (
                                                <li><Link to="">{currentSong.artist.firstName} {currentSong.artist.lastName}</Link></li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div class="saveSong_wrapper">
                                <div className="playlist_icons" data-bs-toggle="modal" data-bs-target="#AddToPlaylistModal">
                                    <div className="plus_icon">
                                        <svg clip-rule="evenodd" fill="#fff" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/>
                                        </svg>
                                    </div>
                                    <div className="circleCheck_icon">
                                        <svg clip-rule="evenodd" fill="#3BE477" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="likeSong_icons" >
                                    <div className="like_icon">
                                        <svg clip-rule="evenodd" fill="#fff" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z" fill-rule="nonzero"/>
                                        </svg>
                                    </div>
                                    <div className="circleCheck_icon">
                                        <svg clip-rule="evenodd" fill="#3BE477" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="middle_side_wrapper">
                            <div className="playController_wrapper">
                                <div className="shuffleIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M18 9v-3c-1 0-3.308-.188-4.506 2.216l-4.218 8.461c-1.015 2.036-3.094 3.323-5.37 3.323h-3.906v-2h3.906c1.517 0 2.903-.858 3.58-2.216l4.218-8.461c1.356-2.721 3.674-3.323 6.296-3.323v-3l6 4-6 4zm-9.463 1.324l1.117-2.242c-1.235-2.479-2.899-4.082-5.748-4.082h-3.906v2h3.906c2.872 0 3.644 2.343 4.631 4.324zm15.463 8.676l-6-4v3c-3.78 0-4.019-1.238-5.556-4.322l-1.118 2.241c1.021 2.049 2.1 4.081 6.674 4.081v3l6-4z"/>
                                    </svg>
                                </div>
                                <div className="previousIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M4 2v20h-2v-20h2zm18 0l-16 10 16 10v-20z"/>
                                    </svg>
                                </div>
                                <div className="mainPlayPauseIcon">
                                {
                                    isPause ? (
                                        <div className="mainPlayIcon" onClick={togglePlayPause}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="20" height="20" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/>
                                        </svg>
                                        </div>
                                    ) : (
                                        <div className="mainPauseIcon" onClick={togglePlayPause}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="20" height="20" viewBox="0 0 24 24">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2V8h2v8zm6 0h-2V8h2v8z"/>
                                        </svg>
                                        </div>
                                    )
                                }
                                </div>
                                <div className="nextIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M4 2v20h-2v-20h2zm18 0l-16 10 16 10v-20z"/>
                                    </svg>  
                                </div>
                                <div className="repeatIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="18" height="18" viewBox="0 0 24 24">
                                    <path d="M2 12c0 .999.381 1.902.989 2.604l-1.098.732-.587.392c-.814-1.025-1.304-2.318-1.304-3.728 0-3.313 2.687-6 6-6h9v-3l6 4-6 4v-3h-9c-2.206 0-4 1.794-4 4zm20.696-3.728l-.587.392-1.098.732c.608.702.989 1.605.989 2.604 0 2.206-1.795 4-4 4h-9v-3l-6 4 6 4v-3h9c3.313 0 6-2.687 6-6 0-1.41-.489-2.703-1.304-3.728z"/>
                                </svg>
                                </div>
                            </div>
                            <div className="playSongRange_wrapper">
                                <span>0:0</span>
                                <input type="range" min="0" max="100" value="30" className="slider" id="songRange"/>
                                <span>4:29</span>
                            </div>
                        </div>
                        <div class="right_side_wrapper">
                            <div className="playIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="18" height="18" viewBox="0 0 24 24">
                                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/>
                                </svg>
                            </div>
                            <div className="valumeWrapper">
                                <div className="valumeUnmute">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M6 7l8-5v20l-8-5v-10zm-6 10h4v-10h-4v10zm20.264-13.264l-1.497 1.497c1.847 1.783 2.983 4.157 2.983 6.767 0 2.61-1.135 4.984-2.983 6.766l1.498 1.498c2.305-2.153 3.735-5.055 3.735-8.264s-1.43-6.11-3.736-8.264zm-.489 8.264c0-2.084-.915-3.967-2.384-5.391l-1.503 1.503c1.011 1.049 1.637 2.401 1.637 3.888 0 1.488-.623 2.841-1.634 3.891l1.503 1.503c1.468-1.424 2.381-3.309 2.381-5.394z"/>
                                    </svg>
                                </div>
                                <div className="volumeMute">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M19 7.358v15.642l-8-5v-.785l8-9.857zm3-6.094l-1.548-1.264-3.446 4.247-6.006 3.753v3.646l-2 2.464v-6.11h-4v10h.843l-3.843 4.736 1.548 1.264 18.452-22.736z"/>
                                    </svg>
                                </div>
                                <div className="valumeRange">
                                    <input type="range" min="0" max="100" value="30" className="slider" id="volumeRange"/>
                                </div>
                            </div>

                            <div className="reSize">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="18" height="18" viewBox="0 0 24 24">
                                    <path d="M16 0v2h-8v-2h8zm2 2h4v4h2v-6h-6v2zm-16 4v-4h4v-2h-6v6h2zm22 2h-2v8h2v-8zm-2 10v4h-4v2h6v-6h-2zm-22 6h16v-16h-16v16z"/>
                                </svg>
                            </div>
                            <div className="fullScreen">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#9e9e9e" width="18" height="18" viewBox="0 0 24 24">
                                    <path d="M24 9h-2v-5h-7v-2h9v7zm-9 13v-2h7v-5h2v7h-9zm-15-7h2v5h7v2h-9v-7zm9-13v2h-7v5h-2v-7h9z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                )
            ) : (
            <div class="authSec">
                <div class="auth_content_wrapper">
                    <p>Preview of Spotify</p>
                    <span>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</span>    
                </div>
                <Link to="#" class="btns btn_one">Sign up free</Link>
            </div>
            )}

            {/* Create Playlist Modal */}
            <div className="modal fade" id="AddToPlaylistModal" tabIndex="-1" aria-labelledby="AddToPlaylistModalLabel" aria-hidden="true">
                <AddToPlaylistModal addSongToPlaylist = {addSongToPlaylist} />
            </div>
        </main>

        </>
    );
}


export default LoggedInContainer;


