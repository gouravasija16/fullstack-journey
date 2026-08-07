import {moodData} from '../data/moodData.js'
export default function LeftPanel(props){
    return(
        <>
        {props.selectedmood && (
            <div className='current-mood'>
                <h1 className='current-mood-emoji'>{moodData[props.selectedmood].emoji}</h1>
                <h1>Currently Feeling:</h1>
                <p>{moodData[props.selectedmood].label}</p>
            </div>
        )}
        <div className="mood-history" >
          <h1>📅 Mood History</h1> 
          <div className='history-item'>
            {props.moods}
          </div>   
        </div>
        <div className='streak'>
           <p className="streak-emoji">🔥</p>
           <h1 className='streak-number'>{props.streak}</h1> 
           <h2 className='streak-label'> Day Streak!</h2>

        </div>
        </>
    )

} 