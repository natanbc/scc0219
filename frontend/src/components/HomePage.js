import { SignIn } from './SignIn.js';

export function HomePage() {
    return <div>
        <div className="row">
            <div className="col s0 m1"/>
            <div className="col s12 m5 flow-text" onClick={() => {
                if(!window.epic_song) {
                    const audio = new Audio("https://files.natanbc.net/usp/scc0219/ram_ranch.opus");
                    audio.loop = true;
                    audio.volume = 0.1;
                    audio.play();
                    window.epic_song = audio;
                    alert("RAM RANCH REALLY ROCKS");
                } else {
                    if(window.epic_song.paused) {
                        window.epic_song.play();
                    } else {
                        window.epic_song.pause();
                    }
                }
            }}>
                <br/><br/>
                32 gigs of RAM in the DIMM slots at RAM Ranch<br/>
                <br/>
                Red hot connection pins wanting to be read<br/>
                32 gigs of RAM wanting their memory to be fed<br/>
                <br/>
                RAM in the DIMM slots at Ram Ranch<br/>
                <br/>
                Tightly connected desperately waiting for overclocks<br/>
                RAM Ranch really rocks!
            </div>
            <div className="col m1"/>
            <div className="col s12 m5">
                <SignIn/>
            </div>
        </div>
    </div>;
}
