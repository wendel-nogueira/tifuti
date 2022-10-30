import Head from 'next/head'
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const { user, signIn } = useAuth();

    console.log(user);

    return (
        <>
            <h1>Login</h1>

            <button onClick={() => signIn()}>Sign in with Google</button>
        </>
    )
}