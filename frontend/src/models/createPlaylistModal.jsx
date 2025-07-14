import TextInput from "../components/shares/TextInput";
// import FileInput from "../components/shares/FileInput";
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";


const CreatePlaylistModal = () => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    const createPlaylist = async()=>{
        const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
            playlistName:playlistName,thumbnail:playlistThumbnail,songs:[]
        }) 
        console.log(response);
    }

    const resetPlaylist = () => {
        setPlaylistName("");        
        setPlaylistThumbnail("");       
    }

    return (
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-white" style={{ backgroundColor: "var(--grey800)" }}>
                <div class="modal-header">
                    <div class="modal-title fs-5" id="CreatePlaylistModalLabel"><h4>Create Playlist</h4></div>
                    <button type="button" class="btn-close text-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body form_wrapper mt-0">
                    <TextInput label="Name" name="playlistName" placeholder="Write Playlist name" value={playlistName} setValue={setPlaylistName} />
                    <TextInput label="Thumbnail" name="playlistThumbnail" placeholder="Put the thumbnail url" value={playlistThumbnail} setValue={setPlaylistThumbnail} />
                    {/* <FileInput label="Thumbnail" name="playlistThumbnail" accept="" onChange=""/> */}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btns greenBtn" onClick={() => {
                        createPlaylist();
                        resetPlaylist();
                    }}
                    data-bs-dismiss="modal">Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePlaylistModal;