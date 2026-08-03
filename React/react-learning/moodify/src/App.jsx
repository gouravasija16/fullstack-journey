import React from 'react'
import Header from "./components/Header.jsx"
import MoodSelector from "./components/MoodSelector.jsx"
import { moodData } from "./data/moodData.js"
import SongGrid from "./components/SongGrid.jsx"
import Favourites from './components/Favourites.jsx'
import MoodHistory from './components/MoodHistory.jsx'
import Footer from './components/Footer.jsx'
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
    setMoodHistory(prevmood=>{
      const now=new Date()
      return [{
        mood:moodData[moodKey].label,
        time:now.toLocaleTimeString("en-Us",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:true
      }),
      emoji:moodData[moodKey].emoji
      },...prevmood]
    })
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
         {moodHistory.length>0 && <MoodHistory moodHistory={moodHistory} selectedmood={selectedmood} />} 
      </main>
      <Footer />
    </div>
    )
}
export default App
