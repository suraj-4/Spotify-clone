import { useState } from "react";
import axios from 'axios';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_TRACK_PRESET, CLOUDINARY_UPLOAD_Thumbnail_PRESET } from '../utils/config';
import LoggedInContainer from "../layout/LoggedInContainer";
import TextInput from "../components/shares/TextInput";
import FileInput from "../components/shares/FileInput";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { Link, useNavigate } from "react-router-dom";

const SongUploadComponent = ()=> {
    const [songName , setSongName] = useState("");
    const [thumbnail , setThumbnail] = useState("");
    const [track, setTrack] = useState(null);
    const [playlistUrl , setPlaylistUrl] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();

    const uploadSong = async () => {
        if (!songName || !track || !thumbnail) {
            alert("All fields are required");
            return;
        }

        try {
            // ✅ Upload thumbnail
            const thumbData = new FormData();
            thumbData.append('file', thumbnail);
            thumbData.append('upload_preset', CLOUDINARY_UPLOAD_Thumbnail_PRESET);

            const thumbRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, thumbData );

            const uploadedThumbnailUrl = thumbRes.data.secure_url;

            // ✅ Upload track
            const trackData = new FormData();
            trackData.append('file', track);
            trackData.append('upload_preset', CLOUDINARY_UPLOAD_TRACK_PRESET);

            const trackRes = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, trackData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percent);
                    }
                }
            );

            const uploadedTrackUrl = trackRes.data.secure_url;

            // ✅ Build final song data
            const songData = {
            songName,
            thumbnail: uploadedThumbnailUrl,
            track: uploadedTrackUrl
            };

            console.log('Uploaded song data:', songData);

            const response = await makeAuthenticatedPOSTRequest("/song/create", songData);

            if (response && !response.err) {
                console.log("Server response:", response);
                navigate("/latest-song");
            } else {
                alert("Song not Uploaded. Please try again.");
                console.log("Server response:", response);
            }

        } catch (error) {
            console.error('Upload error:', error);
        }
    };


    return (
        <LoggedInContainer>
            <div className="row__outer_wrapper upload">
                <div className="row_wrapper">
                    <div className="sec_heading">
                        <h3><a href="">Upload songs</a></h3>
                        <Link to="/latest-song">See all</Link>
                    </div>
                    <div className="row form_wrapper">
                        <div className="col-6">
                            <TextInput label="Name" name="songName" placeholder="Name" value={songName} setValue={setSongName}/>
                        </div>
                        <div className="col-6">
                            <FileInput label="Thumbnail" name="thumbnail" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])}/>
                        </div>
                        <div className="col-6">
                            <FileInput label="Song" name="track" accept="audio/*" onChange={(e) => setTrack(e.target.files[0])}/>
                            {uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="progress mt-2">
                                    <div className="progress_bar" role="progressbar" style={{ width: `${uploadProgress}%` }} aria-valuenow={uploadProgress}
                                    aria-valuemin="0" aria-valuemax="100">
                                    {uploadProgress}%
                                    </div>
                                </div>
                            )}

                            {uploadProgress === 100 && (
                                <span>Upload complete!</span>
                            )}
                        </div>

                        <div className="col-3">
                            <button className="btns greenBtn" onClick= {(e)=>{
                                e.preventDefault();
                                uploadSong();
                            }}>Upload Song</button>
                        </div>
                    </div>
                </div>
            </div>
        </LoggedInContainer>
    );
}

export default SongUploadComponent;