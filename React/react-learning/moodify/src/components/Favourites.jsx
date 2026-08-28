import SongCard from "./SongCard"
import {Heart} from "lucide-react"
export default function Favourites(props){
     const favourite = !props.Favourites.length ? 
          <div className="empty-favourites">
            <Heart size={22}/>
            <h3>No Favourites yet</h3>
            <p>Save songs you love and they'll appear here</p>
        </div>
        : 
         <>
         <div className="favourites-header">
           <div className="favourites-icon">
            <Heart size={22}/>
           </div>
           <div>
             <h2>Favourites Songs</h2>
             <p>Your personal collection</p>
           </div>
            <button className="clear-btn" onClick={props.clearFavourites}>Clear All</button>
            </div>
            <div className="favourites-grid">
             {props.Favourites.map(song=>{
                 return <SongCard  key={song.id} song={song} isFavourite={true} onFavourite={()=>onFavourite(song)}/>
            })}
            </div>
         </>
    return(
        <div className="favourites">
            {favourite}
        </div>
    )
}