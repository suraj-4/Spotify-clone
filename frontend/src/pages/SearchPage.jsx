import { useLocation } from "react-router-dom";
import SingleListSong from "../components/shares/SingleListSong";
import LoggedInContainer from "../layout/LoggedInContainer";


const SearchPage = () => {
    const location = useLocation();
    const results = location.state?.results || [];
    
   return (
     <LoggedInContainer>
        <div className="row__outer_wrapper upload">
            <div className="row_wrapper">
                <div className="sec_heading">
                    <h4>Search Result</h4>
                </div>
                <div className="song_list_container ">
                    {
                        results.length > 0 ? (
                            results.map((song) => (
                                <SingleListSong key={song._id} songData={song} />
                            ))
                        ) : (
                            <p>No results found.</p>
                        )
                    }
                </div>
            </div>
        </div>
     </LoggedInContainer>
   );
 }


export default SearchPage;