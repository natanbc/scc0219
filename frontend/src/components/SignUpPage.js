import { SignUp } from './SignUp.js';

export function SignUpPage({usersRepo}) {
    return <div className="row">
        <div className="col s0 m3 l4" />
        <div className="col s12 m6 l4">
            <SignUp usersRepo={usersRepo}></SignUp>
        </div>
        <div className="col s0 m3 l4" />
    </div>;
}
