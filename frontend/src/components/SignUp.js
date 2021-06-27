export function SignUp() {
    return <div>
        <form className="card-panel col s3 offset-s1" action="/gate/signup" method="POST">
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
                <div className="input-field col s12">
                    <i className="material-icons prefix">password</i>
                    <input id="confirm-password" type="password" className="validate" />
                    <label htmlFor="password">Confirm Password</label>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <button className="btn waves-effect waves-light right" type="submit" name="action">
                        SIGN UP
                        <i className="material-icons right">login</i>
                    </button>
                </div>
            </div>
        </form>
    </div>;
}