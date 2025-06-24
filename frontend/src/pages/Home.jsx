import { Link } from 'react-router-dom';
// import {Howl, Howler} from 'howler';
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../layout/LoggedInContainer";
import SingleCardSong from "../components/shares/SingleCardSong";


const HomeComponent = () => {
    const [songsData ,setSongsData] = useState([]);

    useEffect(() => {
        // fetch data
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/song/all-songs");
            if (response?.getAllSongs?.length > 0) {
                setSongsData(response.getAllSongs);
            } else {
                alert("Data not found.");
            }
        }
        getData(); 
    },[]);

    return (
        <>
            <LoggedInContainer>
                <div className="row__outer_wrapper home">
                    <div className="row_wrapper">
                        <div className="sec_heading">
                            <h3><Link to="/latest-song">Latest Songs</Link></h3>
                            <Link to="/latest-song">See all</Link>
                        </div>
                        <div className="card_style_two_wrapper">
                            {
                                songsData.slice(0, 5).map((item) =>{
                                    return <SingleCardSong songData={item} playMusic={()=>{}}/>;
                                })
                            }
                        </div>
                    </div>
                    <div className="row_wrapper">
                        <div className="sec_heading">
                            <h3><Link to="/trending-song">Trending songs</Link></h3>
                            <Link to="/trending-song">See all</Link>
                        </div>
                        <div className="card_style_two_wrapper">
                            <SingleCardSong songName="Helllo"/>
                            <SingleCardSong songName="Bro"/>
                            <SingleCardSong songName="Mera"/>
                            <SingleCardSong songName="Masti"/>
                        </div>
                    </div>
                    <div className="row_wrapper">
                        <div className="sec_heading mb-4">
                            <h3><Link to="/recently-play">Recently Play</Link></h3>
                            <Link to="/recently-play">See all</Link>
                        </div>
                        <div className="card_style_two_wrapper">
                            <SingleCardSong songName="Helllo"/>
                        </div>
                    </div>
                    <div className="row_wrapper">
                        <div className="sec_heading mb-4">
                            <h3><Link to="/popular-song">Popular Songs</Link></h3>
                            <Link to="/popular-song">See all</Link>
                        </div>
                        <div className="card_style_two_wrapper">
                            <SingleCardSong songName="Mera"/>
                            <SingleCardSong songName="Masti"/>
                        </div>
                    </div>
                </div>
            </LoggedInContainer>
        </>
    );
}


export default HomeComponent;