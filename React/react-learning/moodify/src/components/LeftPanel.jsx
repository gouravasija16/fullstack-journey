import {moodData} from '../data/moodData.js'
export default function LeftPanel(props){
    return(
        <>
        {props.selectedmood && (
            <div>
                <h1>{moodData[props.selectedmood].emoji}</h1>
                <h1>Currently Feeling:</h1>
                <p>{moodData[props.selectedmood].label}</p>
            </div>
        )}
        <div className="mood-history" >
          <h1>📅 Mood History</h1>
            {props.moods}
        </div>
        </>
    )

} 