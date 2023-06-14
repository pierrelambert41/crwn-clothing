import { signInWithGoogle, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"; 

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGoogle();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google Popup
            </button>
        </div>
    )
}

export default SignIn;