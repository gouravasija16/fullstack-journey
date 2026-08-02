export default function SongCard(props){
    return(
        <div className="song-card">
           <img src={props.song.cover} alt="🎵"/>
           <h1>{props.song.title}</h1>
           <h2>{props.song.artist}</h2>
           <p>{props.song.duration}</p>
           <button>
            <a href={props.song.youtubeUrl} target="_blank">▶️</a>
           </button>
           <button onClick={() => props.onFavourite(props.song)} className={"heart-btn " + (props.isFavourite ? "favourite" : "")}>
            ❤️
           </button>

        </div>

    )

}