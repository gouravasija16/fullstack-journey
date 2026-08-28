export default function SongCard(props){
    const minutes=Math.floor(props.song.duration/60)
    const seconds=props.song.duration%60
    const formatted=`${minutes}:${seconds < 10 ?'0':''}${seconds}`
    return(
        <div className="song-card">
          <img  className="song-cover" src={props.song.album ?.cover_medium}
            alt={props.song.album?.title}
            lading="lazy"       
            />
            <div className="song-info">
           <h2  className="song-title">{props.song.title}</h2>
           <h3 className="song-artist">{props.song.artist.name}</h3>
           </div>
           <p className="song-duration">{ formatted}</p>
           <audio className="song-preview" controls src={props.song.preview}></audio>
           <div className="song-actions">
             <a className="youtube-btn" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(props.song.title + " " + props.song.artist.name)}`} target="_blank" rel="noreferrer"> 
               🎵 Youtube
             </a>
           <button onClick={() => props.onFavourite(props.song)} className={"heart-btn " + (props.isFavourite ? "favourite" : "")}>
             ❤️
           </button>
        </div>
     </div> 

    )

}