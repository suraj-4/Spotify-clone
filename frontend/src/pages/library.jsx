import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../layout/LoggedInContainer";
import SingleCard from "../components/shares/SingleCard";


const Library = () =>{
    const [playlistsData ,setPlaylistsData] = useState([]);
    useEffect(() => {
        // fetch data
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
            if (response?.playlists?.length > 0) {
                setPlaylistsData(response.playlists);
            } else {
                alert("Data not found.");
            }
        }
        getData(); 
    },[]);


    return (
        <LoggedInContainer>
            <div className="row__outer_wrapper home">
                <div className="row_wrapper">
                    <div className="sec_heading">
                        <h3><Link>Library</Link></h3>
                        <Link to="/latest-song">See all</Link>
                    </div>
                    <div className="card_style_two_wrapper">
                        {
                            playlistsData.map((item) =>{
                                return <SingleCard playlistData={item}/>;
                            })
                        }
                    </div>
                </div>
            </div>
        </LoggedInContainer>
    )
}

export default Library;