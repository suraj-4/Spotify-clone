import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/main.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../src/assets/js/custom';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./pages/Login";
import SignupComponent from "./pages/Signup";
import SongUploadComponent from "./pages/SongUpload";
import LatestSongListComponent from "./pages/LatestSongList";
import SearchPage from "./pages/SearchPage";
import { useCookies } from 'react-cookie';
import { useState } from "react";
import HomeComponent from './pages/Home';
import SongContext from './contexts/songContext';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [musicPlayed,setMusicPlayed] = useState(null);
  const [isPause, setIsPause] = useState(true);

  const [cookie ,setCookie] = useCookies(["token"]);
  return (
    <BrowserRouter>
      {cookie.token ?(
        // login in
        <SongContext.Provider value={{currentSong, setCurrentSong, musicPlayed, setMusicPlayed, isPause, setIsPause}}>
          <Routes>
            <Route path='/' element={<HomeComponent />} />
            <Route path='/upload-song' element={<SongUploadComponent />} />
            <Route path='/latest-song' element={<LatestSongListComponent />} />
            <Route path='/search' element={<SearchPage/>} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </SongContext.Provider>
        ) : (
        // login out
        <Routes>
          <Route path='/' element={<HomeComponent />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/signup' element={<SignupComponent />} />
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
