import SongCard from "./SongCard"
export default function SongGrid(props){ 
   
    return (
        props.songs.length ?
        props.songs.map(song=>(
            <SongCard key={song.id} song={song} isFavourite={props.Favourites.some(Favourite=>Favourite.id===song.id)} onFavourite={()=>props.onFavourite(song)} />
        ))
        :<p className="not-found">No songs found...</p>
    )
}