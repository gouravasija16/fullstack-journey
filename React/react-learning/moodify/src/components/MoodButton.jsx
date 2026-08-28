
export default function MoodButton(props) {
    return(
        <div className="moodSelector">
            <button className={props.moodKey===props.Selectedmood ? "mood-card active" : "mood-card"} onClick={()=>props.onselect(props.moodKey)}>
            <div className="mood-icon">
            {(()=>{
                const Icon=props.emoji;
                return Icon ? <Icon size={30} />: null;
            })()}
            </div>
            <div className="mood-info">
                 <h3 >{props.label}</h3>
                <p>{props.description}</p>
            </div>
           
            </button>
            {props.isCustom && (
                <div className="custom-actions">
                    <button
                        className="delete-mood-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onDelete();
                        }}
                    >
                        ❌
                    </button>
                    <button className="edit-mood-btn" onClick={(e)=>{
                        e.stopPropagation()
                        props.onEdit()
                    }}>📝</button>
                </div>
            )}
            </div>
    )
    
}