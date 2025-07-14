import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleList from "../components/shares/SingleList";


const AddToPlaylistModal = ({addSongToPlaylist}) => {
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
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-white" style={{ backgroundColor: "var(--grey800)" }}>
                <div class="modal-header">
                    <div class="modal-title fs-5" id="AddToPlaylistModalLabel"><h4>Select Playlist</h4></div>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body form_wrapper mt-0">
                    {
                        playlistsData.slice(0, 5).map((item) =>{
                            return <SingleList playlistInfo={item} AddSongToPlaylist = {addSongToPlaylist}/>;
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AddToPlaylistModal;