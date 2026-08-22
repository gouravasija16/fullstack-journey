
export default  function Stats({totalFavourites, totalMoods,getMostPickedMood}){
  return(
    <>
     <div className="stat-card">
      <h2 className="stat-icon">❤️</h2>
      <h2 className="stat-number">{totalFavourites}</h2>
      <p >Favourites</p>
     </div>
     <div className="stat-card">
        <h2 className="stat-icon">🎵</h2>
        <h2 className="stat-number">{ totalMoods}</h2>
        <p className="stat-label">Moods</p>
     </div>
     <div className="stat-card">
        <h2 className="stat-icon">{getMostPickedMood().favMoodEmoji}</h2>
        <p className="stat-number">{getMostPickedMood().favMood}</p>
        <p className="stat-label">Top Mood</p>
     </div>
    </>
  )
}