import SongCard from "./SongCard"
export default function Favourites(props){
     const favourite = !props.Favourites.length ? null : 
         <>
            <h1>❤️ Your Favourites</h1>
            <div className="favourites-grid">
             {props.Favourites.map(song=>{
                 return <SongCard id={song.id} key={song.key} song={song} isFavourite={true} onFavourite={()=>onFavourite(song)}/>
            })}
            </div>
         </>
    return(
        <div className="favourites">
            {favourite}
        </div>
    )
}