export const Projects=()=>{
    return (
        <>
          <div className="projects">
            <h1>Projects</h1>
            <div className="project-card" >
                <h1 className="project-title">🌤️ WeatherSphere</h1>
                <p className="project-desc">A modern weather application that provides real-time weather information using a weather API,with a clean glassmorphism-inspired interface and location-based search.
                Provides AI advice based on conditions using Gemini API </p>
            </div>
            <div className="project-card">
            <h1 className="project-title">✅ Todo App</h1>
            <p className="project-desc">A feature-rich task management app with priority levels,due dates,filters,search,and dark mode mode to help organize daily tasks efficiently</p>
            </div>
            <div className="project-card">
            <h1 className="project-title">🧠 Quiz App</h1>
            <p className="project-desc">An interactive quiz application that tests users with multiple-choice questions,tracks scores. and provides instant feedback in a responsive interface</p>
            </div>
            </div>
        </>
        
    )
}