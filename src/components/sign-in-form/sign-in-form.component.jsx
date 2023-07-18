import { useState } from 'react';
import { signInWithGoogle, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const signInWithGooglePopup = async () => {
        const { user} = await signInWithGoogle();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break;
                default:
                    console.log(error);
            }
        
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput l
                    label='Email' 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}/>

                <FormInput 
                    label='Password' 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                    />

                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGooglePopup}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;