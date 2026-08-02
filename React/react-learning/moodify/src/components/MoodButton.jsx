
export default function MoodButton(props) {
    const activeBtn=props.moodKey=== props.Selectedmood ? "active" : ""
    return(
        <div className="moodSelector">
            <button className={activeBtn} onClick={()=>props.onselect(props.moodKey)}>
            <p>{props.emoji} </p>
            <h1>{props.label}</h1>
            </button>
        </div>
    )
    
}