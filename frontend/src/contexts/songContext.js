import { createContext } from "react";

const SongContext = createContext({
    curentSong: null,
    setCurrentSong: (curentSong) => {},
    musicPlayed: null,
    setMusicPlayed: () => {},
    isPause:null, 
    setIsPause :() => {},
});

export default SongContext;