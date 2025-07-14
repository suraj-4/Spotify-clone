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
                <div className="three_dots_icon">
                    <div className="dots_icon dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg width="24" height="24" fill="#fff" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
                        </svg>
                    </div>
                    <ul className="dropdown-menu">
                        <li>
                            <button type="button" className="btn dropdown-item d-flex gap-2 align-items-center">
                                <div className="plus_icon">
                                    <svg clip-rule="evenodd" fill="#fff" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/>
                                    </svg>
                                </div>
                                <span>Add Playlist</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" className="btn dropdown-item d-flex gap-2 align-items-center">
                                <div className="like_icon">
                                    <svg clip-rule="evenodd" fill="#fff" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z" fill-rule="nonzero"/>
                                    </svg>
                                </div>
                                <span>Like Song</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleListSong;