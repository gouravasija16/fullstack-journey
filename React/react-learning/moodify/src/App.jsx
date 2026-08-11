import React, { useEffect } from 'react'
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
  const [lastVisited,setLastVisited]=React.useState(JSON.parse(localStorage.getItem("lastVisited"))|| "")
  const [songs,setSongs]=React.useState([])
  const [loading,setLoading]=React.useState(false)
  React.useEffect(()=>{
    if(!selectedmood) return 
    setLoading(true)
    setSongs([])
    const terms=moodData[selectedmood].searchTerm
    const randomTerm=terms[Math.floor(Math.random()*terms.length)]
    const searchTerms=encodeURIComponent(randomTerm)
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTerms}&limit=16`;
    console.log(url)
    console.log(terms)
    const options = {
	  method: 'GET',
	  headers: {
		'x-rapidapi-key':import.meta.env.VITE_RAPIDAPI_KEY,
		'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};
try {
	fetch(url, options)
	.then(res=>res.json())
	.then(result=>{
		console.log(result);
		setSongs(result.data || []);
	})
  setLoading(false)
} catch (error) {
	console.error(error);
  setLoading(false)
}
  },[selectedmood])
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
    setMoodHistory(prevMood=>{
      const now=new Date()
      return [{
        mood:moodData[moodKey].label,
        time:now.toLocaleTimeString("en-US",{
          hour:"2-digit",
          minute:"2-digit",
          hour12:true
        }),
        emoji:moodData[moodKey].emoji
      },...prevMood]
    })
    setTimeout(()=>songsRef.current?.scrollIntoView({behavior:"smooth"}),100)
    setSearchQuery("")
    const today=new Date().toLocaleDateString()
    const yesterday=new Date(Date.now()-86400000).toLocaleDateString()

    setStreak(prevStreak=>{
      if(lastVisited===yesterday) return prevStreak+1
      if(lastVisited===today) return prevStreak
      return 1
    })
    setLastVisited(today)
  }

  React.useEffect(()=>{
    localStorage.setItem("streak",JSON.stringify(streak))
  },[streak])

  React.useEffect(()=>{
    localStorage.setItem("lastVisited",JSON.stringify(lastVisited))
  },[lastVisited])

  React.useEffect(()=>{
    localStorage.setItem("moodHistory",JSON.stringify(moodHistory))
  },[moodHistory])

  function clearFavourites(){
    setFavourites([])
    localStorage.removeItem("favourites")
  }

  const currentSongs = searchQuery
    ? songs.filter(song => {
        const query = searchQuery.toLowerCase()
        return song.title?.toLowerCase().includes(query) ||
          song.artist?.name?.toLowerCase().includes(query)
      })
    : songs
    

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
