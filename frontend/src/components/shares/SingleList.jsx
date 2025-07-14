import { Link } from 'react-router-dom';

const SingleList = ({playlistInfo, AddSongToPlaylist}) => {

    return (
        <>
        <div className="card_list_wrapper playlist-nodal" onClick={()=> {
            AddSongToPlaylist(playlistInfo._id)}} data-bs-dismiss="modal">
            <div className="image_outer_wrap">
                <div className="small_image_wrap">
                    <img src={playlistInfo.thumbnail} alt={playlistInfo.playlistName} />
                </div>
            </div>
            <div className="name_wrap_one">
                <h6>{playlistInfo.playlistName}</h6>
                <ul className="singer_name_one">
                    <li><Link to="#">{playlistInfo.owner.firstName} {playlistInfo.owner.lastName}</Link></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default SingleList;