
export default function MoodSelector(props) {
    return(
        <section>
        <h1>How are you feeling today?</h1>
            <button>
            <p>{props.emoji}</p>
            <h1>{props.label}</h1>
            </button>
        </section>
    )
    
}