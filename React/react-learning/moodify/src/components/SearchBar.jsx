export default function SearchBar(props){

    return(
        <div className="search-bar">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input className="search-input"type="text"  value={props.globalSearch} 
        onChange={(e)=>props.onSearch(e.target.value)}
        placeholder="Search songs or artists..."></input>
        <button className="search-clear" onClick={()=>props.onSearch("")}>Clear</button>
        </div>

    )
}