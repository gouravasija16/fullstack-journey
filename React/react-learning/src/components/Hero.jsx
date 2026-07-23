 import profile from "../images/profile.jpg";

export const Hero = () => {
    return(
        <main>
        <img src={profile} alt="gourav"/>
        <h1 className="avail">Available for opportunities</h1>
        <div className="hero">
            <h1>Hi,I'm👋</h1>
            <h1 className="name">Gourav Asija</h1>
            <h1 className="dev">Aspiring full Stack Developer</h1>
            <p>I enjoy building modern web applications and continuously learning new technologies.Currently exploring React while creating projects that improve my skills and prepare me for a software engineering career</p>
        </div>
        </main>
    )
 }