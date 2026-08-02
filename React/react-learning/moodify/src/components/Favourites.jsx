import SongCard from "./SongCard"
export default function Favourites(props){
     const favourite = !props.Favourites.length ? null : 
         <>
            <h1>❤️ Your Favourites</h1>
            {props.Favourites.map(song=>{
                return <SongCard id={song.id} key={song.key} song={song} isFavourite={true} onFavourite={()=>onFavourite(song)}/>
            })}
         </>
    return(
        <div className="favourites">
            {favourite}
        </div>
    )
}