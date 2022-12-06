import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useAuth } from '../hooks/useAuth';
import Main from '../components/main/Main';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box, CircularProgress, TextField, InputLabel, FormControl, NativeSelect, Modal, Divider, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import firebase, { db, auth } from "../lib/firebase";
import { styled as muiStyled } from '@mui/material/styles';
import { Search } from '@mui/icons-material';
import { useCart } from '../hooks/useCart';

const StyledCard = muiStyled(Card)({
    maxWidth: 240,
    background: 'transparent',
    position: 'relative',
    zIndex: 1,
    boxShadow: 'none',
    '&:before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 'calc(100% - 70px)',
        background: '#47A359',
        zIndex: -1,
        transition: 'all 0.3s ease',
        borderRadius: '10px',
    },
    '&:hover': {
        '&:before': {
            height: '100%',
        },
    },
    '& img': {
        borderRadius: '10px',
        objectFit: 'contain',
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: '#F9FAFC',
    borderRadius: '8px',
    border: 'none',
    padding: '24px',
    outline: 'none',
};

const CssButton = muiStyled(Button)({
    background: '#47A359',
    '&:hover': {
        background: '#398748',
    }
});

const Products = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null)
    };

    const { addToCart } = useCart()

    return (
        <>
            <Box style={{
                width: '90%',
                margin: '0 auto',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '30px',
            }}>
                {products.map((product) => (
                    <StyledCard sx={{
                        width: 240,
                    }}
                        onClick={() => {
                            setSelectedProduct(product)
                            console.log(selectedProduct)
                            handleOpen()
                        }}>
                        <CardActionArea sx={{
                            height: '100%',
                        }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={{
                                    color: '#fff',
                                    fontFamily: 'Montserrat, sans-serif',
                                }}>
                                    {product.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" style={{
                                    color: '#F9FAFC',
                                    fontFamily: 'Montserrat, sans-serif',
                                    textAlign: 'right',
                                    marginTop: '10px',
                                }}>
                                    preço: R$ {product.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </StyledCard>
                ))}
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 id="modal-modal-title" style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '24px',
                        fontWeight: 600,
                        color: '#000',
                        marginBottom: '20px',
                    }}>{selectedProduct?.name}</h2>

                    <Divider />

                    <Box style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}>
                        <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            <img src={selectedProduct?.image} alt={selectedProduct?.name} style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'contain',
                            }} />
                            <Box style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                            }}>
                                <Typography variant="body2" color="text.secondary" style={{
                                    color: 'rgb(101, 116, 139)',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 400,
                                }}>
                                    {selectedProduct?.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                    }}>
                        <Typography variant="body2" color="text.secondary" style={{
                            color: 'rgb(101, 116, 139)',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 400,
                            marginTop: '20px',
                        }}>
                            preço: R$ {selectedProduct?.price}
                        </Typography>
                        <CssButton variant="contained" style={{
                            marginTop: '20px',
                            color: '#fff',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 600,
                        }} onClick={() => {
                            addToCart(selectedProduct)
                            handleClose()
                        }}>
                            Adicionar ao carrinho
                        </CssButton>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

const CssTextField = muiStyled(TextField)({
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

export default function Home() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('todas')
    const [search, setSearch] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        db.collection("categories").get().then((querySnapshot) => {
            const categories = [];

            querySnapshot.forEach((doc) => {
                categories.push(doc.data());
            });

            setCategories(categories);
        });

        db.collection("products").get().then((querySnapshot) => {
            const products = [];

            querySnapshot.forEach((doc) => {
                products.push(doc.data());
            });

            setProducts(products);
            setFilteredProducts(products);
        });

        setLoading(false);
    }, []);

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);

        if (event.target.value === 'todas') {
            setFilteredProducts(products);
            return;
        } else {
            const filteredProducts = products.filter((product) => product.category === event.target.value);
            setFilteredProducts(filteredProducts);
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);

        if (event.target.value === '') {
            setFilteredProducts(products);
            return;
        } else {
            const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(event.target.value.toLowerCase()));
            setFilteredProducts(filteredProducts);
        }
    };

    return (
        <Grid container>
            <Grid item xs={0} sm={0} md={2} style={{
                background: `rgb(8, 16, 9)`,
            }}>
                <Header page="home" title="Home" />
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
                <Main style={{}}>
                    <Box sx={{
                        width: '100%',
                        minHeight: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 32px',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <CssTextField label="busca" variant="standard" onChange={handleSearch} />
                        </Box>

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Categoria
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={30}
                                    inputProps={{
                                        name: 'categoria',
                                        id: 'uncontrolled-native',
                                    }}
                                    onChange={handleChange}
                                >
                                    <option value={'todas'}>Todas</option>

                                    {categories.map((category) => (
                                        <option value={category.name}>{category.name}</option>
                                    ))}
                                </NativeSelect>
                            </FormControl>
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
                        : <Products products={filteredProducts} />}
                </Main>
                <Footer />
            </Grid>
        </Grid>
    )
}