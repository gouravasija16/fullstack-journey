import  MoodButton from "./MoodButton";
import { moodData } from "../data/moodData.js"
import {moodIcon} from "../data/moodData.js"
import {moodDescription} from "../data/moodData.js"
export default function MoodSelector({onSelect,Selectedmood,customMoods,onShowAddMood,onDeleteMood,onEditMood}){
    const entries = Object.entries(moodData).map(entry => {
      return (
        <div key={entry[0]} >
          <MoodButton
            label={entry[1].label}
            emoji={moodIcon[entry[0]]}
            onselect={() => onSelect(entry[0])}
            Selectedmood={Selectedmood}
            moodKey={entry[0]}
            description={moodDescription[entry[0]]}
          />
        </div>
      )
    }) 
     const customMoodsElement=customMoods.map((mood,index)=> {
      console.log("Custom mood:",mood)
         return (
          <div key={index}>
           <MoodButton
            key={index}
            moodKey={mood.label}
            label={mood.label}
            emoji={mood.emoji}
            onselect={() => onSelect(mood.label)}
            Selectedmood={Selectedmood}
            onDelete={()=>onDeleteMood(mood.label)}
            isCustom={true}
            onEdit={()=>onEditMood(mood)}
            />
           </div>
         )
      })
  return(
    <div className='moodBtn'>
        {entries}
        {customMoodsElement}
      <button className="add-mood-btn" onClick={onShowAddMood}>+ Add Mood</button>
    </div>
  )
}
