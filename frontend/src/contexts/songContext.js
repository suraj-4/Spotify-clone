import { createContext } from "react";

const SongContext = createContext({
    curentSong: null,
    setCurrentSong: (curentSong) => {}
});

export default SongContext;