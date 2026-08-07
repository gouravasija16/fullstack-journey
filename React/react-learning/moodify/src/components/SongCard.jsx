export default function SongCard(props){
    return(
        <div className="song-card">
           <p>{props.song.cover}</p>
           <h1>{props.song.title}</h1>
           <h2>{props.song.artist}</h2>
           <p className="duration">{props.song.duration}</p>
           <div className="song-buttons">
           <button className="youtube-btn">
            <a href={props.song.youtubeUrl} target="_blank">▶️</a>
           </button>
           <button onClick={() => props.onFavourite(props.song)} className={"heart-btn " + (props.isFavourite ? "favourite" : "")}>
            ❤️
           </button>
          
           </div>
        </div>

    )

}