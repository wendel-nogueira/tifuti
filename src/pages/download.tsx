import Head from 'next/head'
import Footer from '../components/footer/Footer'
import Main from '../components/main/Main';
import { Grid } from '@mui/material';

export default function Download() {
    return (
        <Grid container>
            <Head>
                <title>Download | tifuti</title>
            </Head>
            <Grid item xs={12} sm={12} md={12}>
                <Main>
                    <h1>Download</h1>
                </Main>
                <Footer />
            </Grid>
        </Grid>
    )
}