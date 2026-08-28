import {moodData} from '../data/moodData.js'
import {moodIcon} from "../data/moodData.js"
import {Calendar,Flame} from "lucide-react"
export default function LeftPanel(props){
    const MoodIcon=moodIcon[props.currentMoodData?.label]
    return(
        <>
        {props.selectedmood && (
            <div className='current-mood'>
                <h1 className='current-mood-emoji'>
                { MoodIcon && <MoodIcon size={45}/>}
                </h1>
                <h3>Currently Feeling:</h3>
                <p>{props.currentMoodData?.label}</p>
            </div>
        )}
        <div className="mood-history" >
          <h2 className='history-heading'><Calendar size={25}/><span>Mood History</span></h2> 
          <div className='history-item'>
            {props.moods}
          </div>   
        </div>
        <div className='streak'>
           <p className="streak-emoji"><Flame size={45}/></p>
           <h2 className='streak-number'>{props.streak}</h2> 
           <h3 className='streak-label'> Day Streak!</h3>

        </div>
        </>
    )

} 