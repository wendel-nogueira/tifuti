import Head from 'next/head'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useAuth } from '../hooks/useAuth';
import Main from '../components/main/Main';
import { Grid } from '@mui/material';

export default function Orders() {
    const { user } = useAuth();

    console.log(user); // null

    return (
        <Grid container>
            <Grid item xs={0} sm={0} md={2} style={{ 
                background: `rgb(8, 16, 9)`,
            }}>
                <Header username='hulley' userType='shop' profilePicture='teste' page="orders" title="Pedidos"/>
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
                <Main>
                    <h1>Orders</h1>
                </Main>
                <Footer />
            </Grid>
        </Grid>
    )
}