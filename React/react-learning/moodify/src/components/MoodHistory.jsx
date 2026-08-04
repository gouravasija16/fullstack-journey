import LeftPanel from "./LeftPanel"
export default function MoodHistory(props) {
    const moods = props.moodHistory.slice(0, 5).map((history, index) => (
        <div key={index} className="mood-history-item">
            <span className="history-emoji">{history.emoji}</span>
            <span className="history-label">{history.mood}</span>
            <span className="history-time">• {history.time}</span>
        </div>
    ))
    return <LeftPanel moods={moods} selectedmood={props.selectedmood} />
}