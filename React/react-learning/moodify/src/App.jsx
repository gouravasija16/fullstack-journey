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
  const [favourites,setFavourites]=React.useState(JSON.parse(localStorage.getItem("favourites"))||[])
  const [moodHistory,setMoodHistory]=React.useState(JSON.parse(localStorage.getItem("moodHistory"))||[])
  const songsRef=React.useRef(null)
  function onFavourite(song){
    setFavourites(prevfavourites=>{
      return prevfavourites.some(prevfavourite=>prevfavourite.id===song.id) ? prevfavourites.filter(prevfavourite=>prevfavourite.id!==song.id) : [...prevfavourites,song]
    })
  }
  React.useEffect(()=>{
    localStorage.setItem("favourites",JSON.stringify(favourites))

  },[favourites])
  function onSelect(moodKey){
    setSelectedmood(moodKey)
    // songsRef.current.scrollIntoView({behavior:"smooth"})
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
    React.useEffect(()=>{
      localStorage.setItem("moodHistory",JSON.stringify(moodHistory))

    },[moodHistory])
    console.log(songsRef)
  return (
    <div className="main-wrapper" style={ {
      background:selectedmood ? moodData[selectedmood].bg : "",
      "--accent":selectedmood ?  moodData[selectedmood].accent :"#61dafb"
    }}>
      <Header />
      <main>
        <h1>How are you feeling?</h1>
        <MoodSelector Selectedmood={selectedmood} onSelect={onSelect} />
        <div className='main-content'>
        <div className='left-panel'>
          {moodHistory.length>0 && <MoodHistory moodHistory={moodHistory} selectedmood={selectedmood} />} 
        </div>
        <div className='right-panel'>
        {selectedmood && (
          <div className="songs-container">
            <h1>🎵 Songs for {selectedmood} </h1>
            <div className='song-grid' ref={songsRef}>
            <SongGrid songs={moodData[selectedmood].songs} Favourites={favourites} onFavourite={onFavourite} />
            </div>
          </div>
        )}
        <Favourites Favourites={favourites} onFavourite={onFavourite}/>
        </div>
        </div>
      </main>
      <Footer />
    </div>
    )
}
export default App
