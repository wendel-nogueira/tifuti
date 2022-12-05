import Head from 'next/head'
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { Box, Button, Grid } from '@mui/material';

export default function Login() {
    const { user, signInWithGoogle, signInWithFacebook } = useAuth();
    const router = useRouter();

    console.log(user);

    if (user) {
        router.push("/");
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100vh',
                background: `linear-gradient(116.82deg, #47A359 0%, #192D1D 100%)`,
            }}
        >
            <Head>
                <title>Login | tifuti</title>
            </Head>

            <Grid container>
                <Grid item xs={24} sm={10} md={6} style={{
                    background: '#F9FAFC',
                    height: '100vh',
                    marginRight: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '0 2rem'
                }}>
                    <img src="images/login.png" alt="logo" style={{ width: '100%', maxWidth: '180px' }} />

                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: '#192D1D',
                        marginTop: '2rem',
                        fontFamily: 'Montserrat, sans-serif',
                    }}>Bem-vindo ao <span style={{ color: '#47A359' }}>tifuti</span></h1>

                    <p style={{
                        fontSize: '1.2rem',
                        fontWeight: 400,
                        color: '#192D1D',
                        marginTop: '1rem',
                        marginBottom: '2rem'
                    }}>O seu sistema de compras de produtos de hortifruti!</p>

                    <Button variant="outlined" size="small" onClick={signInWithGoogle} style={{
                        color: '#47A359',
                        borderColor: 'rgb(230, 232, 240)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        gap: '5px',
                        width: '230px',
                        padding: '5px 22px',
                    }}>
                        <FcGoogle size={24} />
                        <p style={{
                            fontSize: '0.8rem',
                            fontWeight: 400,
                            color: '#192D1D',
                        }}>Entrar com Google</p>
                    </Button>

                    <Button variant="outlined" size="small" onClick={signInWithFacebook} style={{
                        color: '#47A359',
                        borderColor: 'rgb(230, 232, 240)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        width: '230px',
                        padding: '5px 22px',
                    }}>
                        <FaFacebookF size={24} color="#4267B2" />
                        <p style={{
                            fontSize: '0.8rem',
                            fontWeight: 400,
                            color: '#192D1D',
                        }}>Entrar com Facebook</p>
                    </Button>

                    <p style={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: '#192D1D',
                        marginTop: '2rem'
                    }}>Não tem uma conta? <a href="/register" style={{ color: '#47A359' }}>Cadastre-se</a></p>
                </Grid>
            </Grid>
        </Box>
    )
}
