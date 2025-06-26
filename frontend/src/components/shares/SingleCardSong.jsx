import { Link } from 'react-router-dom';
import { useContext } from 'react';
import SongContext from '../../contexts/songContext';

const SingleCardSong = ({songData}) => {
    const { currentSong, setCurrentSong } = useContext(SongContext);

    if (!songData) {
        return <p>Sorry! No data available</p>;
    }
    return (
        <>
        <div className="card_style_two">
            <div className="image_outer_wrap">
                <div className="image_wrap">
                    {songData.thumbnail ? (
                        <img src={songData.thumbnail} alt={songData.songName} />
                    ) : (
                        <p>No thumbnail</p>
                    )}
                </div>
                <div className="play_icon" onClick={()=>{
                        setCurrentSong(songData);
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#3BE477" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                    </svg>
                </div>
            </div>
            <div className="name_wrap_one">
                <h6>{songData.songName || "Unknown Song"}</h6>
                <ul className="singer_name_one">
                    <li><Link to="#">{songData.artist.firstName || "Unknown Artist"}</Link></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default SingleCardSong;