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
  const [streak,setStreak]=React.useState(JSON.parse(localStorage.getItem("streak"))|| 0)
  const [lastVisited,setLastVisited]=React.useState(JSON.parse(localStorage.getItem("lastVisited"))|| "")
  const [songs,setSongs]=React.useState([])
  const [loading,setLoading]=React.useState(false)
  const [globalSearch,setGlobalSearch]= React.useState("")
  const [searchResults,setSearchResults]= React.useState([])
  const [isSearching,setIsSearching]= React.useState(false)

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
//Search Bar
async function handleGlobalSearch(term){
  if(!term.trim()){
    setIsSearching(false)
    setSearchResults([])
    return
  }
  setIsSearching(true)
  setLoading(true)
  try{
    const response=await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(term)}&limit=12`,
      {
     method: 'GET',
	   headers: {
		 'x-rapidapi-key':import.meta.env.VITE_RAPIDAPI_KEY,
		 'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
		 'Content-Type': 'application/json'
	      }
      }
    ) 
    const data =await response.json()
    console.log(data)
    setSearchResults(data.data)
    setLoading(false)
  }catch(error){
    console.error(error);
    setLoading(false)
  }
}
useEffect(()=>{
  const timer=setTimeout(()=>{
    handleGlobalSearch(globalSearch)
  },500)
  return ()=>clearTimeout(timer)
},[globalSearch])
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
    setGlobalSearch("")
    setSearchResults([])
    setIsSearching(false)
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
    const today=new Date().toLocaleDateString()
    const yesterday=new Date(Date.now()-86400000).toLocaleDateString()
    setStreak(prevStreak=>{
      if(lastVisited===yesterday) return prevStreak+1
      if(lastVisited===today) return prevStreak
      return 1
    })
    console.log(streak)
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
    const favouritesCount=favourites.length
    const songsToDisplay=isSearching ?searchResults :songs
     React.useEffect(()=>{
      if(songsToDisplay.length>0){
        songsRef.current?.scrollIntoView({
          behavior:"smooth",
          block:"start"
        })
      }
    },[songsToDisplay])

  return (
    <div className="main-wrapper" style={ {
      background:selectedmood ? moodData[selectedmood].bg : "",
      "--accent":selectedmood ?  moodData[selectedmood].accent :"#61dafb"
    }}>
      <Header />
      <main>
        <h1>How are you feeling?</h1>
        <MoodSelector Selectedmood={selectedmood} onSelect={onSelect} />
         <SearchBar globalSearch={globalSearch} onSearch={setGlobalSearch}/>
        <div className='main-content'>
        <div className='left-panel'>
          {moodHistory.length>0 && <MoodHistory moodHistory={moodHistory} selectedmood={selectedmood} streak={streak} />} 
          <section className='stats'>
          <div className='favourites-count'>
          <h2>Total Favourites</h2>
          <p>{favouritesCount}</p>
          </div>
          </section>
        </div>
        <div className='right-panel'>
        {(selectedmood || isSearching)&& (
          <div className="songs-container">
            {selectedmood ?<h1>🎵 Songs for {selectedmood} </h1>:isSearching?<h1>🎵Songs for {globalSearch}</h1>:null}
            <div className='song-grid'ref={songsRef}>
            <SongGrid songs={songsToDisplay} Favourites={favourites} onFavourite={onFavourite}  />
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
