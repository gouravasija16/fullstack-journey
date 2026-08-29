import {useState} from "react"
import { moodDescription,customMoodsIcons} from "../data/moodData"
export default function AddMoodForm({onAddMood,onCancel}){
    const [selectedIcon,setSelectedIcon]=useState("Smile")
    const [label,setLabel]=useState("")
    const [accent,setAccent]=useState("#61dafb")
    const [searchTerm,setSearchTerm]=useState([])
    const [moodInfo,setMoodInfo]=useState("")
    function handleSubmit(props){
        if(!selectedIcon.trim() || !label.trim() || !searchTerm.length) return 
           onAddMood({icon:selectedIcon,label,accent,searchTerm,description:moodInfo})
    }
    return(
        <section className="add-mood-form">
        <h3>✨ Add Custom Mood</h3>
        <div className="form-group">
         <h3>Choose an icon</h3>
         <div className="icon-picker">
         {Object.entries(customMoodsIcons).map(([name, Icon]) => (
          <button
            key={name}
            type="button"
            className={selectedIcon===name ?"icon-option selected":
            "icon-option"}
            onClick={()=>setSelectedIcon(name)}
            >
              <Icon size={22} />
            </button>
         ))}
         </div>
        </div>
        <div className="form-group">
          <label>Mood Name</label>
          <input className="form-input"
          value={label}
          onChange={(e)=>setLabel(e.target.value)}
          placeholder="Mood name e.g. Nostalgic"
          />
        </div>
        <div className="form-group">
          <label>Accent Color</label>
          <input className="color-input"
          value={accent}
          onChange={(e)=>setAccent(e.target.value)}
          type="color"
          />
        </div>
        <div className="form-group">
          <label>MoodDescription</label>
          <textarea className="mood-info" value={moodInfo} onChange={(e)=>setMoodInfo(e.target.value)} placeholder="Describe this mood..." />
        </div>
        <div className="form-group">
          <label>Search Term</label>
          <input className="form-input"
          value={searchTerm.join(',')}
          onChange={(e)=>setSearchTerm(e.target.value.split(',').map(item=>item.trim()))}
          placeholder="e.g arijit singh sad"/>
        </div>
        <div className="form-buttons">
          <button  className="submit-btn" onClick={handleSubmit}>Add Mood</button>
          <button  className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
    </section>
    )

}