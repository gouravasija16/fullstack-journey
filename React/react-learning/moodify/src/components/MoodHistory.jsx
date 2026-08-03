import LeftPanel from "./LeftPanel"
export default function MoodHistory(props) {
    const moods = props.moodHistory.slice(0, 5).map((history, index) => (
        <div key={index} className="mood-history-item">
            <span>{history.emoji}</span>
            <span>{history.mood}</span>
            <span>• {history.time}</span>
        </div>
    ))
    return <LeftPanel moods={moods} selectedmood={props.selectedmood} />
}