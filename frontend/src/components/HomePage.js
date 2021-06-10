export function HomePage() {
    return <div>
        <div className="row">
            <div className="col s6 offset-s1 flow-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit lacus sit amet metus ullamcorper, at condimentum neque sagittis. Praesent euismod tortor nisi, eu lacinia elit volutpat et. Integer interdum libero id porttitor pulvinar. Nulla vel sagittis orci. Sed dignissim ex in massa tempus, a euismod risus consectetur. Proin et massa in magna tempus commodo. Phasellus et dui luctus, tincidunt est a, facilisis nibh. Quisque vel elit ac diam vehicula aliquam sit amet sit amet nunc. Aenean vestibulum eros sit amet urna scelerisque rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus nec nibh efficitur, gravida lorem at, dignissim nisi. Vivamus nec ornare felis. Sed eu nibh volutpat, ultrices tellus a, ultricies nisl.
            </div>
            <form className="card-panel col s3 offset-s1">
                <div className="row">
                    <div className="input-field col s12">
                        <i class="material-icons prefix">email</i>
                        <input id="email" type="email" className="validate"/>
                        <label for="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i class="material-icons prefix">password</i>
                        <input id="password" type="password" className="validate"/>
                        <label for="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button className="btn waves-effect waves-light right" type="submit" name="action">
                            Login
                            <i className="material-icons right">login</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>;
}