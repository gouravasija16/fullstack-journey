export default function SongCard(props){
    return(
        <div className="song-card">
           {/* <p>{props.song.album.cover_medium}</p> */}
           <h1>{props.song.title}</h1>
           <h2>{props.song.artist.name}</h2>
           <p className="duration">{props.song.duration}</p>
           <div className="song-buttons">
           <audio controls src={props.song.preview}></audio>
           <button className="youtube-btn">
            <a href={props.song.link} target="_blank">🎵 Full Song</a>
           </button>
           <button onClick={() => props.onFavourite(props.song)} className={"heart-btn " + (props.isFavourite ? "favourite" : "")}>
            ❤️
           </button>
          
           </div>
        </div>

    )

}