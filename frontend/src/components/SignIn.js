export function SignIn() {
    return <div>
        <form className="card-panel col s3 offset-s1" action="/gate/signin" method="POST">
            <div className="row">
                <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input id="email" type="email" className="validate" />
                    <label htmlFor="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <i className="material-icons prefix">password</i>
                    <input id="password" type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <a href="/signup" className="left">SIGN UP</a>
                    <button className="btn waves-effect waves-light right" type="submit" name="action">
                        SIGN IN
                        <i className="material-icons right">login</i>
                    </button>
                </div>
            </div>
        </form>
    </div>;
}