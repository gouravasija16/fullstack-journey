
export default function MoodButton(props) {
    return(
        <div className="moodSelector">
            <button className={props.moodKey===props.Selectedmood ? "active" : ""} onClick={()=>props.onselect(props.moodKey)}>
            <p>{props.emoji} </p>
            <h1>{props.label}</h1>
            </button>
        </div>
    )
    
}