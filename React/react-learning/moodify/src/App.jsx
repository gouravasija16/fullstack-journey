import { useState } from 'react'
import { moodData } from './data/moodData.js'
import Header from "./components/Header.jsx"
import MoodSelector from './components/MoodSelector.jsx'
function App() {
  
  return (
    <>
      <Header />
      <main>
      <MoodSelector label={moodData.happy.label} emoji={moodData.happy.emoji}/>
        
      </main>
    </>
    )
}

export default App
