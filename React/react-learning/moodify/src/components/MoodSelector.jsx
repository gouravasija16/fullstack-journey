import  MoodButton from "./MoodButton";
import { moodData } from "../data/moodData.js"
export default function MoodSelector({onSelect,Selectedmood}){
    const entries = Object.entries(moodData).map(entry => {
      return (
        <div key={entry[0]}>
          <MoodButton
            label={entry[1].label}
            emoji={entry[1].emoji}
            onselect={() => onSelect(entry[0])}
            Selectedmood={Selectedmood}
            moodKey={entry[0]}
          />
        </div>
      )
    })
  return(
    <div className='moodBtn'>
        {entries}
      </div>
  )
}