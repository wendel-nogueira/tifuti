import Head from 'next/head'
import Footer from '../components/footer/Footer'
import Main from '../components/main/Main';
import { Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssButton = styled(Button)({
    background: '#47A359',
    '&:hover': {
        background: '#398748',
    }
});

export default function Download() {
    return (
        <Grid container>
            <Head>
                <title>Download | tifuti</title>
            </Head>
            <Grid item xs={12} sm={12} md={12}>
                <Main style={{ 
                    justifyContent: 'center',
                 }}>
                    <h3 style={{
                        textAlign: 'center',
                        color: '#47A359',
                        fontWeight: 'bold',
                        fontSize: '2.5rem',
                        marginBottom: '2rem',
                        fontFamily: 'Montserrat, sans-serif'
                    }}>Download</h3>

                    <p style={{
                        textAlign: 'center',
                        color: 'rgb(101, 116, 139)',
                        fontWeight: '500',
                        fontSize: '1.2rem',
                        marginBottom: '0.8rem'
                    }}>Faça o download do aplicativo tifuti</p>

                    <p style={{
                        textAlign: 'center',
                        color: 'rgb(101, 116, 139)',
                        fontWeight: '500',
                        fontSize: '1.2rem',
                        marginBottom: '2rem'
                    }}>Disponível para Android</p>

                    <a href="./files/tifuti.apk" download>
                        <CssButton variant="contained" style={{
                            color: '#fff',
                            marginBottom: '2rem'
                        }}>Download</CssButton>
                    </a>

                    <a href="/" style={{
                        color: '#47A359',
                        textDecoration: 'none',
                        fontWeight: '400',
                        fontSize: '1rem'
                    }}>Voltar para a página inicial</a>
                </Main>
                <Footer />
            </Grid>
        </Grid>
    )
}