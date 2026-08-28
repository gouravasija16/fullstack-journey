import {Music2} from "lucide-react"
export default function Header(){
    return (
        <header className="navbar">
        <div className="navbar-logo">
           <Music2 className="logo-icon" />
           <span className="logo-text">MOODIFY</span>
        </div>   
        </header>
    )
}