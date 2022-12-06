import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useAuth } from '../hooks/useAuth';
import Main from '../components/main/Main';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TablePagination, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';


export default function History() {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        console.log(user);

        if (user) {
            db.collection('users').doc(user.uid).get().then((doc) => {
                console.log(doc.data());
            });

            db.collection('users').doc(user.uid).collection('orders').get().then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setHistory(data);
            });
        }
    }, [user]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Grid container>
            <Grid item xs={0} sm={0} md={2} style={{
                background: `rgb(8, 16, 9)`,
            }}>
                <Header page="history" title="Histórico" />
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
                <Main style={{}}>
                    <Box sx={{
                        width: '100%',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '24px',
                    }}>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: '#47A359',
                            fontFamily: 'Montserrat, sans-serif',
                            textAlign: 'center'
                        }}>Histórico de compras</h1>

                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: 'rgb(101, 116, 139)',
                            fontFamily: 'Montserrat, sans-serif',
                            textAlign: 'center'
                        }}>Aqui você pode ver o histórico de suas compras</p>
                    </Box>
                </Main>
                <Footer />
            </Grid>
        </Grid>
    )
}