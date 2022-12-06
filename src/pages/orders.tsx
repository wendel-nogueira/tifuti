import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import Main from '../components/main/Main';
import { Grid, Box, TextField, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, CircularProgress, IconButton, Divider, Modal, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import firebase, { db, auth } from "../lib/firebase";
import { Info } from '@mui/icons-material';

const CssButton = styled(Button)({
    background: '#47A359',
    '&:hover': {
        background: '#398748',
    }
});

const CssButtonCancel = styled(Button)({
    background: '#FF3547',
    '&:hover': {
        background: '#CC0000',
    }
});

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#47A359',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#47A359',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(101, 116, 139)',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(101, 116, 139)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgb(101, 116, 139)',
        },
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    width: 'auto',
    bgcolor: '#F9FAFC',
    borderRadius: '8px',
    border: 'none',
    padding: '24px',
    outline: 'none',
};

export default function Orders() {
    const [search, setSearch] = useState('')
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const getOrders = () => {
        setOrders([])
        setFilteredOrders([])

        db.collection('users').get().then((snapshot) => {
            snapshot.forEach((docUser) => {
                db.collection('users').doc(docUser.id).collection('orders').orderBy('date', 'desc').get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        const data = doc.data()

                        data['user'] = docUser.id;
                        data['orderId'] = doc.id;

                        setOrders((orders) => [...orders, data])
                        setFilteredOrders((orders) => [...orders, data])
                    })
                })
            })
        })

        db.collection('products').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                setProducts((products) => [...products, doc.data()])
            })
        })

        setLoading(false);
    }

    useEffect(() => {
        getOrders();
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);

        if (event.target.value === '') {
            setFilteredOrders(orders);
            return;
        } else {
            const filtered = orders.filter((order) => {
                return order.payment?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    order.telefone?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    order.location?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    order.status?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    order.date?.toLowerCase().includes(event.target.value.toLowerCase());
            });

            setFilteredOrders(filtered);
        }
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const columns = [
        ['data', 'date'],
        ['local', 'location'],
        ['telefone', 'telefone'],
        ['pagamento', 'payment'],
        ['total', 'totalPrice'],
        ['status', 'status'],
    ]

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [selectedOrder, setSelectedOrder] = useState({} as any)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenModal = (order) => {
        setSelectedOrder(order)
        handleOpen()
    }

    const getProduct = (id) => {
        const product = products.find((product) => product.productId === id)

        return product;
    }

    const handleInitOrder = () => {
        db.collection('users').doc(selectedOrder.user).collection('orders').doc(selectedOrder.orderId).get().then((doc) => {
            const data = doc.data()

            data['status'] = 'em andamento'

            db.collection('users').doc(selectedOrder.user).collection('orders').doc(selectedOrder.orderId).set(data).then(() => {
                console.log('atualizado')

                getOrders()
                handleClose()
            })
        })
    }

    const handleConfirmOrder = () => {
        db.collection('users').doc(selectedOrder.user).collection('orders').doc(selectedOrder.orderId).get().then((doc) => {
            const data = doc.data()

            data['status'] = 'finalizado'

            db.collection('users').doc(selectedOrder.user).collection('orders').doc(selectedOrder.orderId).set(data).then(() => {
                console.log('atualizado')

                getOrders()
                handleClose()
            })
        })
    }

    const handleCancelOrder = () => {
        db.collection('users').doc(selectedOrder.user).collection('orders').doc(selectedOrder.orderId).get().then((doc) => {
            const data = doc.data()

            data['status'] = 'cancelado'

            db.collection('users').doc(selectedOrder.user).collection('orders').doc(selectedOrder.orderId).set(data).then(() => {
                console.log('atualizado')

                getOrders()
                handleClose()
            })
        })
    }

    return (
        <Grid container>
            <Grid item xs={0} sm={0} md={2} style={{
                background: `rgb(8, 16, 9)`,
            }}>
                <Header page="orders" title="Pedidos" />
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
                        }}>Pedidos</h1>

                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: 'rgb(101, 116, 139)',
                            fontFamily: 'Montserrat, sans-serif',
                            textAlign: 'center'
                        }}>Aqui você pode acompanhar seus pedidos</p>
                    </Box>

                    <Box sx={{
                        width: '100%',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '24px',
                        padding: '0 24px',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <CssTextField label="busca" variant="standard" onChange={handleSearch} />
                        </Box>
                    </Box>

                    {loading ?
                        (<Box sx={{
                            width: '100%',
                            margin: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <CircularProgress color="success" />
                            <p style={{
                                color: 'rgb(101, 116, 139)',
                                fontFamily: 'Montserrat, sans-serif',
                                textAlign: 'center',
                                marginTop: '10px',
                            }}>Carregando...</p>
                        </Box>)
                        : (
                            <Paper sx={{
                                width: 'calc(100% - 48px)',
                                height: 'calc(100vh - 65px - 50px - 100px - 50px - 24px)',
                                margin: '0 auto',
                            }}>
                                <TableContainer sx={{
                                    width: '100%',
                                    maxHeight: 'calc(100vh - 65px - 50px - 100px - 50px - 24px - 52px)',
                                }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    columns.map((column) => (
                                                        <TableCell key={column[1]}>
                                                            {column[0]}
                                                        </TableCell>
                                                    ))
                                                }

                                                <TableCell>
                                                    <p>ações</p>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                                        {
                                                            columns.map((column) => (
                                                                <TableCell key={column[1]}>
                                                                    {
                                                                        column[1] === 'totalPrice' ? (
                                                                            new Intl.NumberFormat('pt-BR', {
                                                                                style: 'currency',
                                                                                currency: 'BRL'
                                                                            }).format(order[column[1]])
                                                                        ) : (
                                                                            order[column[1]]
                                                                        )
                                                                    }
                                                                </TableCell>
                                                            ))
                                                        }

                                                        <TableCell>
                                                            <IconButton aria-label="info" size="small" onClick={() => handleOpenModal(order)}>
                                                                <Info fontSize="inherit" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={orders.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        )}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <h6 id="modal-modal-title" style={{
                                fontSize: '1.25rem',
                                fontWeight: 500,
                                color: '#1A2027',
                                marginBottom: '8px',
                                fontFamily: 'Roboto, sans-serif',
                            }}>Informações do pedido</h6>
                            <p id="modal-modal-description" style={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: 'rgb(101, 116, 139)',
                                marginBottom: '8px',
                            }}>Pedido #{selectedOrder?.id}</p>

                            <Divider style={{
                                marginBottom: '48px',
                                marginTop: '24px',
                            }} />

                            <Grid container spacing={2} sx={{
                                minWidth: '1000px',
                                gap: '8px',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}>
                                <Grid item xs={5}>
                                    <div style={{
                                        display: 'flex',
                                        width: '400px',
                                        height: '400px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'rgb(245, 245, 245)',
                                    }} id="map">
                                    </div>
                                </Grid>
                                <Grid item xs={5} sx={{
                                    width: '100%',
                                }}>
                                    <p style={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: 'rgb(101, 116, 139)',
                                        marginBottom: '8px',
                                        width: '100%',
                                    }}>Produtos</p>

                                    <Box sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        {
                                            selectedOrder?.products?.map((product) => (
                                                <Box sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '24px',
                                                    backgroundColor: 'rgb(245, 245, 245)',
                                                    padding: '16px',
                                                    borderRadius: '8px',
                                                }}>
                                                    <Box sx={{
                                                        width: 'auto',
                                                        height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-start',
                                                        marginRight: '16px',
                                                    }}>
                                                        {
                                                            getProduct(product.replace('Id: ', '').replace('Quantidade: ', '').split(' ')[0]) !== undefined ? (
                                                                <img src={getProduct(product.replace('Id: ', '').replace('Quantidade: ', '').split(' ')[0])?.image} alt="product" style={{
                                                                    width: '64px',
                                                                    height: '64px',
                                                                    borderRadius: '8px',
                                                                    marginRight: '16px',
                                                                }} />
                                                            ) : (
                                                                <img src="https://via.placeholder.com/64" alt="product" style={{
                                                                    width: '64px',
                                                                    height: '64px',
                                                                    borderRadius: '8px',
                                                                    marginRight: '16px',
                                                                }} />
                                                            )
                                                        }
                                                    </Box>
                                                    <Box sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start',
                                                        justifyContent: 'center',
                                                    }}>
                                                        <p style={{
                                                            fontSize: '1rem',
                                                            fontWeight: 500,
                                                            color: '#1A2027',
                                                            marginBottom: '8px',
                                                        }}>
                                                            {
                                                                getProduct(product.replace('Id: ', '').replace('Quantidade: ', '').split(' ')[0]) !== undefined ? (
                                                                    getProduct(product.replace('Id: ', '').replace('Quantidade: ', '').split(' ')[0])?.name
                                                                ) : (
                                                                    'Produto não encontrado'
                                                                )
                                                            }
                                                        </p>
                                                        <p style={{
                                                            fontSize: '1rem',
                                                            fontWeight: 500,
                                                            color: 'rgb(101, 116, 139)',
                                                            marginBottom: '8px',
                                                        }}>
                                                            preço:
                                                            {
                                                                getProduct(product.replace('Id: ', '').replace('Quantidade: ', '').split(' ')[0]) !== undefined ? (
                                                                    ' ' + new Intl.NumberFormat('pt-BR', {
                                                                        style: 'currency',
                                                                        currency: 'BRL'
                                                                    }).format(getProduct(product.replace('Id: ', '').replace('Quantidade: ', '').split(' ')[0])?.price)
                                                                ) : (
                                                                    ' R$ 0,00'
                                                                )
                                                            }
                                                        </p>

                                                        <p style={{
                                                            fontSize: '1rem',
                                                            fontWeight: 500,
                                                            color: 'rgb(101, 116, 139)',
                                                            marginBottom: '8px',
                                                        }}>
                                                            quantidade:
                                                            {
                                                                ' ' + product.replace('Id: ', '').replace('Quantidade: ', '').split(' ')[1]
                                                            }
                                                        </p>
                                                    </Box>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: '24px',
                            }}>
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    marginTop: '24px',
                                }}>
                                    <Box sx={{
                                        width: 'auto',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}>
                                        <p style={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: 'rgb(101, 116, 139)',
                                            marginBottom: '8px',
                                        }}>Total: </p>

                                        <p style={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: '#1A2027',
                                            marginBottom: '8px',
                                            marginLeft: '8px',
                                        }}>
                                            {
                                                new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                }).format(selectedOrder?.totalPrice)
                                            }
                                        </p>
                                    </Box>
                                    <Box sx={{
                                        width: 'auto',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}>
                                        <p style={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: 'rgb(101, 116, 139)',
                                            marginBottom: '8px',
                                        }}>Status: </p>

                                        <p style={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: '#1A2027',
                                            marginBottom: '8px',
                                            marginLeft: '8px',
                                        }}>
                                            {
                                                selectedOrder?.status
                                            }
                                        </p>
                                    </Box>

                                    <Box sx={{
                                        width: 'auto',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}>
                                        <p style={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: 'rgb(101, 116, 139)',
                                            marginBottom: '8px',
                                        }}>Data: </p>

                                        <p style={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: '#1A2027',
                                            marginBottom: '8px',
                                            marginLeft: '8px',
                                        }}>
                                            {
                                                selectedOrder?.date
                                            }
                                        </p>
                                    </Box>

                                    <Box sx={{
                                        width: 'auto',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}>
                                        <p style={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: 'rgb(101, 116, 139)',
                                            marginBottom: '8px',
                                        }}>Local: </p>

                                        <p style={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: '#1A2027',
                                            marginBottom: '8px',
                                            marginLeft: '8px',
                                        }}>
                                            {
                                                selectedOrder?.location
                                            }
                                        </p>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    gap: '16px',
                                }}>
                                    {
                                        selectedOrder?.status !== 'finalizado' && selectedOrder?.status !== 'cancelado' && selectedOrder?.status !== 'em andamento' && (
                                            <Button variant="contained" onClick={() => handleInitOrder()}>
                                                Em andamento
                                            </Button>
                                        )
                                    }

                                    {
                                        selectedOrder?.status === 'em andamento' && (
                                            <CssButton variant="contained" onClick={() => handleConfirmOrder()}>
                                                Confirmar entrega
                                            </CssButton>
                                        )
                                    }

                                    {
                                        selectedOrder?.status === 'em andamento' && (
                                            <CssButtonCancel variant="contained" onClick={() => handleCancelOrder()}>
                                                Cancelar pedido
                                            </CssButtonCancel>
                                        )
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                </Main>
                <Footer />
            </Grid>
        </Grid>
    )
}