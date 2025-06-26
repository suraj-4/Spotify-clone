import { useState, useEffect } from "react";
import LoggedInContainer from "../layout/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleListSong from "../components/shares/SingleListSong";
import SingleCardSong from "../components/shares/SingleCardSong";


const LatestSongListComponent = ()=> {
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
        <LoggedInContainer>
            <div className="row__outer_wrapper">
                <div className="row_wrapper">
                    <div className="sec_heading">
                        <h3>Latest Songs</h3>
                    </div>
                    <div className="row">
                        <div className="col-4">
                        {
                            songsData[0] ? (
                                <SingleCardSong songData={songsData[0]} />
                            ) : (
                                <p>No song found</p>
                            )
                        }
                        </div>
                        <div className="col-8">
                            <div className="song_list_container">
                                {
                                    songsData.slice(0, 4).map((item) =>{
                                        return <SingleListSong songData={item}/>;
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row_wrapper">
                    <div className="sec_heading mb-4">
                        <h3>All Songs</h3>
                    </div>
                    <div className="song_list_container ">
                        {
                            songsData.map((item) =>{
                                return <SingleListSong songData={item}/>;
                            })
                        }
                    </div>
                </div>
            </div>
        </LoggedInContainer>
    );
}

export default LatestSongListComponent;