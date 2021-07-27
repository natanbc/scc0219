import { SignIn } from './SignIn.js';

export function HomePage() {
    return <div>
        <div className="row">
            <div className="col s0 m1"/>
            <div className="col s12 m5 flow-text">
                <br/><br/>
                32 gigs of RAM in the DIMM slots at RAM Ranch<br/>
                <br/>
                Red hot connection pins wanting to be read<br/>
                32 gigs of RAM wanting their memory to be fed<br/>
                <br/>
                RAM in the DIMM slots at Ram Ranch<br/>
                <br/>
                Tightly connected depserately waiting for overclocks<br/>
                RAM Ranch really rocks!
            </div>
            <div className="col m1"/>
            <div className="col s12 m5">
                <SignIn/>
            </div>
        </div>
    </div>;
}
