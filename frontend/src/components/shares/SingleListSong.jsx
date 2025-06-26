import { Link } from 'react-router-dom';
import { useContext } from 'react';
import SongContext from '../../contexts/songContext';

const SingleListSong = ({songData}) => {
        const { currentSong, setCurrentSong } = useContext(SongContext);

    if (!songData) {
        return <p>No data available</p>;
    }
    return (
        <>
        <div className="card_list">
            <div className="song_details">
                <div className="image_outer_wrap">
                    <div className="small_image_wrap">
                        {songData.thumbnail ? (
                            <img src={songData.thumbnail} alt={songData.songName}/>
                        ) : (
                            <p>No thumbnail</p>
                        )}
                    </div>
                    <div className="play_icon" onClick={()=>{
                        setCurrentSong(songData);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#3BE477" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                        </svg>
                    </div>
                </div>
                <div className="name_wrap_one">
                    <h6><Link to="#">{songData.songName || "Unknown Song"}</Link></h6>
                    <ul className="singer_name_one">
                        <li><Link to="#">{songData.artist.firstName || "Unknown Artist"}</Link></li>
                    </ul>
                </div>
            </div>
            <div className="other_details">
                <div className="heart_icon">
                    <div className="outline">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" fill="#fff">
                            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
                        </svg>
                    </div>
                    <div className="fill d-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                            <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/>
                        </svg>
                    </div>
                </div>
                <div className="duration">
                    <span>3:44</span>
                </div>
                <div className="dots_icon">
                    <svg width="24" height="24" fill="#fff" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
                    </svg>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleListSong;