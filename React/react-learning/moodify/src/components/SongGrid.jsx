import SongCard from "./SongCard"
export default function SongGrid(props){ 
    return (
        props.songs.map(song=>(
        <SongCard key={song.id} id={song.id} song={song} isFavourite={props.Favourites.some(Favourite=>Favourite.id===song.id)} onFavourite={()=>props.onFavourite(song)}/>
    ))
    )
}