import React from 'react'
import Header from "./components/Header.jsx"
import MoodSelector from "./components/MoodSelector.jsx"
import { moodData } from "./data/moodData.js"
import SongGrid from "./components/SongGrid.jsx"
import Favourites from './components/Favourites.jsx'
import MoodHistory from './components/MoodHistory.jsx'
import Footer from './components/Footer.jsx'
import SearchBar from "./components/SearchBar.jsx"
function App() {
  const [selectedmood,setSelectedmood]=React.useState(null)
  const [favourites,setFavourites]=React.useState(JSON.parse(localStorage.getItem("favourites"))||[])
  const [moodHistory,setMoodHistory]=React.useState(JSON.parse(localStorage.getItem("moodHistory"))||[])
  const songsRef=React.useRef(null)
  const [searchQuery,setSearchQuery]=React.useState("")
  const [streak,setStreak]=React.useState(JSON.parse(localStorage.getItem("streak"))|| 0)
  const [lastVisited,setLastVisited]=React.useState(JSON.parse(localStorage.getItem("streak"))|| "")
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
    setTimeout(()=>songsRef.current?.scrollIntoView({behavior:"smooth"}),100)
    setSearchQuery("")
    const today=new Date().toLocaleDateString()
    const yesterday=new Date(Date.now()-86400000).toLocaleDateString
    if(lastVisited===yesterday){
      setStreak(streak+1)
     
    }else if(lastVisited!==today){
      setStreak(1)
    }
    setLastVisited(today)
    }
    React.useEffect(()=>{
      localStorage.setItem("moodHistory",JSON.stringify(moodHistory))

    },[moodHistory])
    const currentSongs = selectedmood ? moodData[selectedmood].songs.filter(song => {
      return (
        song.artist.toLowerCase().includes(searchQuery) ||
        song.title.toLowerCase().includes(searchQuery)
      )
    }) : [];
    React.useEffect(()=>{
      localStorage.setItem("streak",JSON.stringify(streak))
    },[streak])
    React.useEffect(()=>{
      localStorage.setItem("lastVisited",JSON.stringify(lastVisited))
    },[lastVisited])

    function clearFavourites(){
      setFavourites([])
      localStorage.removeItem("favourites")
    }
   
  return (
    <div className="main-wrapper" style={ {
      background:selectedmood ? moodData[selectedmood].bg : "",
      "--accent":selectedmood ?  moodData[selectedmood].accent :"#61dafb"
    }}>
      <Header />
      <main>
        <h1>How are you feeling?</h1>
        <MoodSelector Selectedmood={selectedmood} onSelect={onSelect} />
        {selectedmood && <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery}/>}
        <div className='main-content'>
        <div className='left-panel'>
          {moodHistory.length>0 && <MoodHistory moodHistory={moodHistory} selectedmood={selectedmood} streak={streak} />} 
        </div>
        <div className='right-panel'>
        {selectedmood && (
          <div className="songs-container"  >
            <h1>🎵 Songs for {selectedmood} </h1>
            <div className='song-grid'ref={songsRef}>
            <SongGrid songs={currentSongs} Favourites={favourites} onFavourite={onFavourite}  />
            </div>
          </div>
        )}
        <Favourites Favourites={favourites} onFavourite={onFavourite} clearFavourites={clearFavourites}/>
        </div>
        </div>
      </main>
      <Footer />
    </div>
    )
}
export default App
