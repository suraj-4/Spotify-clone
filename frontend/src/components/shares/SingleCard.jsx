import { Link } from 'react-router-dom';

const SingleCard = ({playlistData}) => {

    return (
        <>
        <div className="card_style_two">
            <div className="image_outer_wrap">
                <div className="image_wrap">
                    <img src={playlistData.thumbnail} alt={playlistData.playlistName} />
                </div>
            </div>
            <div className="name_wrap_one">
                <h6>{playlistData.playlistName}</h6>
                <ul className="singer_name_one">
                    <li><Link to="#">{playlistData.owner.firstName} {playlistData.owner.lastName}</Link></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default SingleCard;