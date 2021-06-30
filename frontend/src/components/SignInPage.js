import { SignIn } from './SignIn.js';

export function SignInPage({usersRepo}) {
    return <div className="row">
        <div className="col s0 m3 l4" />
        <div className="col s12 m6 l4">
            <SignIn usersRepo={usersRepo}></SignIn>
        </div>
        <div className="col s0 m3 l4" />
    </div>;
}
