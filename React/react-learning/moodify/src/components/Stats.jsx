import {Heart,Trophy,BarChart3} from "lucide-react"
export default  function Stats({totalFavourites, totalMoods,getMostPickedMood}){
  return(
    <div className="stats-container">
    <h2><span><BarChart3 size={24}/></span>Your Stats</h2>
     <div className="stats-grid">
     <div className="stat-item">
      <Heart size={22}/>
      <strong>{totalFavourites}</strong>
      <span>Total Favourites</span>
     </div>
     <div className="stat-item">
     <Trophy size={22}/>
     <strong>{getMostPickedMood().favMood}</strong>
     <span>Most liked Mood</span>
     </div>
     <div className="stat-item">
       <BarChart3 size={22}/>
       <strong>{totalMoods}</strong>
       <span>Total Moods</span>
     </div>
   </div>
  </div>
 )
}