export const MovieCard=(props)=>{
    return(
      <div className="movie-container">
       <img src={props.movie.poster.src} alt={props.movie.poster.alt}/>
       <h1 className="rating">⭐ {props.movie.rating}</h1>
        <h1 className="title">{props.movie.title}</h1>
        <p className="genre-release">{props.movie.year} • {props.movie.genre}</p>
        <p className="description">{props.movie.description}</p>
     </div>
    )
}