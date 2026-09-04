import React, { useEffect } from 'react'
import Header from "./components/Header.jsx"
import MoodSelector from "./components/MoodSelector.jsx"
import { moodData } from "./data/moodData.js"
import SongGrid from "./components/SongGrid.jsx"
import Favourites from './components/Favourites.jsx'
import MoodHistory from './components/MoodHistory.jsx'
import Footer from './components/Footer.jsx'
import SearchBar from "./components/SearchBar.jsx"
import AddMoodForm from "./components/AddMoodForm"
import Stats from "./components/Stats"
import EditMoodForm from './components/EditMoodForm.jsx'
import {Music2} from "lucide-react"
function App() {
  //states
  const [selectedmood,setSelectedmood]=React.useState(null)
  const [favourites,setFavourites]=React.useState(JSON.parse(localStorage.getItem("favourites"))||[])
  const [moodHistory,setMoodHistory]=React.useState(JSON.parse(localStorage.getItem("moodHistory"))||[])
  const [streak,setStreak]=React.useState(JSON.parse(localStorage.getItem("streak"))|| 0)
  const [lastVisited,setLastVisited]=React.useState(JSON.parse(localStorage.getItem("lastVisited"))|| "")
  const [songs,setSongs]=React.useState([])
  const [loading,setLoading]=React.useState(false)
  const [globalSearch,setGlobalSearch]= React.useState("")
  const [searchResults,setSearchResults]= React.useState([])
  const [isSearching,setIsSearching]= React.useState(false)
  const [showAddMood,setShowAddMood]=React.useState(false)
  const [customMoods,setCustomMoods]=React.useState(JSON.parse(localStorage.getItem("customMoods"))|| [])
  const [editingMood,setEditingMood]=React.useState(null)
  const musicSectionRef=React.useRef(null)
  const [listeningMood,setListeningMood]=React.useState(null)
  console.log("customMoods",customMoods)

  function getCurrentMoodData(){
  if(!listeningMood) return ""
  if(moodData[listeningMood]){
    return moodData[listeningMood]
  }
  return customMoods.find(mood=>mood.label===listeningMood)
}
const currentMoodData=getCurrentMoodData()
  //Songs based on data
  React.useEffect(() => {
    if (!listeningMood) return
    const terms = currentMoodData?.searchTerm
    if (!terms || !terms.length) return
    const randomTerm = terms[Math.floor(Math.random() * terms.length)]
    const searchTerms = encodeURIComponent(randomTerm)
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTerms}&limit=16`

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    }

    async function loadSongs(){
      setLoading(true)
      try {
        const res = await fetch(url, options)
        const result = await res.json()
        setSongs(result.data || [])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    loadSongs()
  }, [listeningMood, currentMoodData?.searchTerm])
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
  }catch(error){
    console.error(error);
  }finally{
    setLoading(false)
  }
}
//songs based on search input
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
  //favourites
  React.useEffect(()=>{
    localStorage.setItem("favourites",JSON.stringify(favourites))

  },[favourites])
  // features based on mood
  function onSelect(moodKey){
    setSelectedmood(moodKey)
    setGlobalSearch("")
    setSearchResults([])
    setIsSearching(false)
    const mood=moodData[moodKey] || customMoods.find(mood=>mood.label===moodKey)
    if(!mood) return
    setMoodHistory(prevMood=>{
      const now=new Date()
      return [{
        mood:mood.label,
        time:now.toLocaleTimeString("en-US",{
          hour:"2-digit",
          minute:"2-digit",
          hour12:true
        }), 
        icon:mood?.icon 
      },...prevMood]
    })
    localStorage.removeItem("moodHistory")
    //streak
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

//streak local storages
  React.useEffect(()=>{
    localStorage.setItem("streak",JSON.stringify(streak))
  },[streak])
//last Visited local storage
  React.useEffect(()=>{
    localStorage.setItem("lastVisited",JSON.stringify(lastVisited))
  },[lastVisited])
//mood history
  React.useEffect(()=>{
    localStorage.setItem("moodHistory",JSON.stringify(moodHistory))
  },[moodHistory])
  //custom moods
  React.useEffect(()=>{
    localStorage.setItem("customMoods",JSON.stringify(customMoods))
  },[customMoods])
//Add Moods function 
function addCustomMood(mood){
  const newMood={
    label:mood.label,
    icon:mood.icon,
    accent:mood.accent,
    bg:"linear-gradient(135deg,#1a1a1a,#2d2d2d)",
    description:mood.description,
    searchTerm:mood.searchTerm
  }
  setCustomMoods(prev=>[...prev,newMood])
  setShowAddMood(false)
}
//Edit Button function 
function onEditMood(mood){
    setEditingMood(mood)
   }  
function editCustomMood(updatedMood){
  setCustomMoods(prev=>prev.map(mood=>
    mood.label===editingMood.label ?
    {...mood,...updatedMood}
    :mood
  ))

}
//favorites clear button
  function clearFavourites(){
    setFavourites([])
    localStorage.removeItem("favourites")
  }
  //total favourites
    const favouritesCount=favourites.length
  //total moods
  const totalMoods= Object.keys(moodData).length + customMoods.length
  //Most picked mood
  function getMostPickedMood(){
    if(moodHistory.length===0) return null
    const moodCount={}
    moodHistory.forEach(entry=>{
      moodCount[entry.mood]=(moodCount[entry.mood]|| 0) + 1
    })
    const mostPickedMood=Object.entries(moodCount).sort((a,b)=>b[1]-a[1])[0][0]
    return {
      favMood:mostPickedMood,
      favMoodEmoji:moodHistory.find(entry=>entry.mood===mostPickedMood)?.emoji
    }
  }
  
  //useRef
    const songsToDisplay=isSearching ?searchResults :songs
     React.useEffect(()=>{
      if(songsToDisplay.length>0 && musicSectionRef.current){
       musicSectionRef.current?.scrollIntoView({
          behavior:"smooth",
          block:"start"
        })
      }
    },[songsToDisplay])

   function onCancel(){
    setShowAddMood(false)
   }
   function deleteCustomMood(label){
    setCustomMoods(prev=>
      prev.filter(mood=>mood.label!==label)
    )
    if(selectedmood===label){
      setSelectedmood(null)
    }
   }
   const handleStartListening=()=>{
   if(!selectedmood) return 
    const mood=moodData[selectedmood] || customMoods.find(mood=>mood.label===selectedmood)
    setSongs([])
    setLoading(Boolean(mood?.searchTerm?.length))
    setListeningMood(selectedmood)
  }
    
  return (
    <div className="main-wrapper" style={ {
      background:currentMoodData?.bg ||"",
      "--accent":currentMoodData?.accent||"#61dafb"
    }}>
      <Header />
      <section className="hero">
    <div className="hero-content">
        <p className="hero-label">YOUR MUSIC. YOUR MOOD.</p>
        <h1>
            LISTEN TO MUSIC THAT
            <span> FITS YOUR MOOD.</span>
        </h1>

        <p className="hero-description">
            Simply select your vibe and enjoy a curated playlist
            matched to how you're feeling.
        </p>
    </div>
</section>
      <main>
      <h2 className='mood-section-title'>Choose your mood</h2>
        <MoodSelector Selectedmood={selectedmood} onSelect={onSelect} customMoods={customMoods} onShowAddMood={()=>setShowAddMood(true)} onDeleteMood={deleteCustomMood} onEditMood={onEditMood} />
        {showAddMood && <AddMoodForm
        onAddMood={addCustomMood} icon
        onCancel={onCancel}
         />}
        {editingMood && <EditMoodForm mood={editingMood} onSaveMood={editCustomMood}onCancel={()=>setEditingMood(null)} />}
        <button  className="start-listening-btn" onClick={handleStartListening}>Start Listening<span>→</span></button>
        <section id="search-section">
        <div className='search-heading'>
          <p>EXPLORE MUSIC</p>
          <h2>Discover music beyond your mood.</h2>
        </div>
        <SearchBar globalSearch={globalSearch} onSearch={setGlobalSearch}/>
        </section>
        <div className='main-content'>
        <div className='left-panel'>
          {moodHistory.length>0 && <MoodHistory moodHistory={moodHistory} selectedmood={selectedmood} streak={streak} currentMoodData={currentMoodData} />}
          {favourites.length>0 || moodHistory.length>0 
           ?   <section className='stats'>
          <Stats totalFavourites={favouritesCount}  totalMoods={totalMoods} getMostPickedMood={getMostPickedMood}/>
          </section>
          :null
          } 
        </div>
        <div className='right-panel'>
        {(listeningMood || isSearching)&& (
          <div className="songs-container">
          <div className='songs-header'>
           <div className='songs-heading-icon'>
            <Music2 />
           </div>
            {selectedmood ?<h2 className='songs-title'> Songs for {selectedmood} </h2>:isSearching?<h2 className='songs-title'>Songs for {globalSearch}</h2>:null}
          </div>
           <p className='songs-subtitle'>Your mood,your soundtrack</p>
            <div className='song-grid' ref={musicSectionRef}>
            {loading ? (
              <div className='loading-container'>
               <div className='spinner'></div>
               <p>Finding songs for your mood...</p>
              </div>
            ) : (
              <SongGrid songs={songsToDisplay} Favourites={favourites} onFavourite={onFavourite} />
            )} 
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
