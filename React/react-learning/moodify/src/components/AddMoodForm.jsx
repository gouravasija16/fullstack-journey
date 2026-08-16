import {useState} from "react"
export default function AddMoodForm({onAddMood,onCancel}){
    const [emoji,setEmoji]=useState("")
    const [label,setLabel]=useState("")
    const [accent,setAccent]=useState("#ffff")
    const [searchTerm,setSearchTerm]=useState([])
    function handleSubmit(props){
        if(!emoji.trim() || !label.trim() || !searchTerm.length) return 
           onAddMood({emoji,label,accent,searchTerm})
    }
    return(
        <section className="add-mood-form">
        <h3>✨ Add Custom Mood</h3>
        <div className="form-group">
          <label>Emoji</label>
          <input className="form-input"
          value={emoji}
          onChange={(e)=>setEmoji(e.target.value)}
          placeholder="Enter emoji"
          />
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