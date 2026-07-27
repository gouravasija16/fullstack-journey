
import './App.css'
import Header from "./components/Header"
import { MovieCard } from './components/movie-cards'
import { Footer } from './components/Footer'
import movies from "./data/data.js"


function App() {
  const MovieEntry=movies.map(movie=>{
    return(
      <MovieCard 
      key={movie.id}
       movie={movie}
      />
    )
  })

  return (
    <>
    <Header/>
    <main className="movie-cards">
    {MovieEntry}
    </main >
    <Footer />
    </>
  )
}

export default App
