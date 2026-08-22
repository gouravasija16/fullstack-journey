import {useState} from "react"
export default function EditMoodForm({mood,onSaveMood,onCancel}){
    const [emoji,setEmoji]=useState(mood.emoji)
    const [label,setLabel]=useState(mood.label)
    const [accent,setAccent]=useState(mood.accent)
    const [searchTerm,setSearchTerm]=useState(mood.searchTerm)
function handleSave(){
     if(!emoji.trim() || !label.trim() || !searchTerm.length) return 
    onSaveMood({emoji,label,accent,searchTerm})
}
return(
       <section className="edit-mood-form">
        <h3>✨ Edit Mood</h3>
        <div className="form-group">
          <label>Emoji</label>
          <input className="form-input"
          value={emoji}
          onChange={(e)=>setEmoji(e.target.value)}
          placeholder="Enter new  emoji"
          />
        </div>
        <div className="form-group">
          <label>Mood Name</label>
          <input className="form-input"
          value={label}
          onChange={(e)=>setLabel(e.target.value)}
          placeholder=" New Mood name e.g. Nostalgic"
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
          <button  className="submit-btn" onClick={handleSave}>Save Changes</button>
          <button  className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
    </section>
    )
}
