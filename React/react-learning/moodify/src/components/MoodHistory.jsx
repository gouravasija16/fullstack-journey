import LeftPanel from "./LeftPanel"
import { moodIcon,customMoodsIcons } from "../data/moodData"
export default function MoodHistory(props) {
    const moods = props.moodHistory.slice(0, 5).map((history, index) => {
        const MoodIcon = moodIcon[history?.mood] || customMoodsIcons[history?.mood]
        return (
        <div key={index} className="mood-history-item">
            <span className="history-emoji">{MoodIcon && <MoodIcon size={21} strokeWidth={2}/>}</span>
            <span className="history-label">{history.mood}</span>
            <span className="history-time">{history.time}</span>
        </div>
        )
    })
    return <LeftPanel moods={moods} selectedmood={props.selectedmood} streak={props.streak } currentMoodData={props.currentMoodData}/>
}