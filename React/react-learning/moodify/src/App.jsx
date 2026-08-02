import React from 'react'
import Header from "./components/Header.jsx"
import MoodSelector from "./components/MoodSelector.jsx"
import { moodData } from "./data/moodData.js"
import SongGrid from "./components/SongGrid.jsx"
import Favourites from './components/Favourites.jsx'
import MoodHistory from './components/MoodHistory.jsx'
function App() {
  const [selectedmood,setSelectedmood]=React.useState(null)
  const [favourites,setFavourites]=React.useState([])
  const [moodHistory,setMoodHistory]=React.useState([])
  function onFavourite(song){
    setFavourites(prevfavourites=>{
      return prevfavourites.some(prevfavourite=>prevfavourite.id===song.id) ? prevfavourites.filter(prevfavourite=>prevfavourite.id!==song.id) : [...prevfavourites,song]
    })
  }
  function onSelect(moodKey){
    setSelectedmood(moodKey)
    }
  return (
    <div className="main-wrapper" style={ {
      background:selectedmood ? moodData[selectedmood].bg : "",
      "--accent":selectedmood ?  moodData[selectedmood].accent :"#61dafb"
    }}>
      <Header />
      <main>
        <h1>How are you feeling?</h1>
        <MoodSelector selectedmood={selectedmood} onSelect={onSelect} />
        {selectedmood && (
          <div className="songs-container">
            <h1>🎵 Songs for {selectedmood} </h1>
            <SongGrid songs={moodData[selectedmood].songs} Favourites={favourites} onFavourite={onFavourite} />
          </div>
        )}
        <Favourites Favourites={favourites} onFavourite={onFavourite}/>
         {moodHistory>0 && <MoodHistory moodHistory={moodHistory} />}
      </main>
    </div>
    )
}
export default App
