import Head from 'next/head'
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router'
import { SocialLoginButton } from '../styles/global';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import styled from 'styled-components';


const LoginPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(116.82deg, ${props => props.theme.colors.background_quinary} 0%, ${props => props.theme.colors.background_senary} 100%);
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .image {
        max-width: 266px;
        margin-bottom: 72px;
    }

    .title {
        font-size: 2rem;
        font-weight: 400;
        color: ${props => props.theme.colors.text_quinary};
        margin-bottom: 84px;
        text-align: center;

        span {
            font-family: ${props => props.theme.fonts.secondary};
            font-weight: 700;
            font-size: 2.5rem;
        }
    }

    .buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 24px;
    }
`;

export default function Login() {
    const { user, signInWithGoogle, signInWithFacebook } = useAuth();
    const router = useRouter();

    console.log(user); // null

    if (user) {
        router.push("/");
    }

    return (
        <LoginPage>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <img src="/images/login.png" alt="Login Icon" className="image"/>

                <h1 className='title'>
                    Bem vindo ao <br />
                    <span>tifuti</span>
                </h1>

                <div className="buttons">
                    <SocialLoginButton onClick={() => signInWithGoogle()}>
                        <FcGoogle />
                        Entrar com o Google
                    </SocialLoginButton>
                    <SocialLoginButton onClick={() => signInWithFacebook()}>
                        <FaFacebookF color='#3B5998' />
                        Entrar com o Facebook
                    </SocialLoginButton>
                </div>
            </LoginContainer>
        </LoginPage>
    )
}