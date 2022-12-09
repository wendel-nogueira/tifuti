import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useAuth } from '../hooks/useAuth';
import Main from '../components/main/Main';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TablePagination, IconButton, Box, Button, Modal, Divider, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import { db, storage } from '../lib/firebase';
import { Delete, Edit, PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Add } from '@mui/icons-material';
import { v4 } from 'uuid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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

const CssButtonDialog = styled(Button)({
    color: '#47A359',
    '&:hover': {
        color: '#398748',
    }
});

const CssButtonCancelDialog = styled(Button)({
    color: '#FF3547',
    '&:hover': {
        background: '#CC000008',
        color: '#CC0000',
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
        '&:hover fieldset': {
            borderColor: '#47A359',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#47A359',
        },
    },
});

const CssSelect = styled(Select)({
    '& label.Mui-focused': {
        color: '#47A359',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#47A359',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#47A359',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#47A359',
        },
    },
});

const CssFormControl = styled(FormControl)({
    '& label.Mui-focused': {
        color: '#47A359',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#47A359',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#47A359',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#47A359',
        },
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

export default function Products() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [image, setImage] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const columns = [
        ['imagem', 'image'],
        ['nome', 'name'],
        ['descrição', 'description'],
        ['preço', 'price'],
        ['categoria', 'category'],
        ['quantidade', 'quantity'],
    ]

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [alert, setAlert] = useState(false);
    const handleAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 5000);
    }
    const [alertInfo, setAlertInfo] = useState({} as any);

    const loadProducts = () => {
        db.collection('products').orderBy('name').get().then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());

            setProducts(data);
        });
    }

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        db.collection('categories').orderBy('name').get().then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());

            setCategories(data);
        });
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!image) return;
        if (!selectedCategory) return;
        if (!event.target.name.value) return;
        if (!event.target.price.value) return;
        if (!event.target.quantity.value) return;

        const byteString = atob(image.split(',')[1]);
        const mimeString = image.split(',')[0].split(':')[1].split(';')[0]
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });

        storage.ref(`images/${v4()}.png`).put(blob).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
                const data = {
                    productId: v4(),
                    name: event.target.name.value,
                    category: event.target.category.value,
                    description: event.target.description.value,
                    image: url,
                    price: event.target.price.value,
                    quantity: event.target.quantity.value,
                }

                db.collection('products').doc(data.productId).set(data).then(() => {
                    setAlertInfo({
                        title: 'Sucesso!',
                        description: 'Produto cadastrado com sucesso!',
                        severity: 'success',
                    });

                    handleAlert();
                }).catch((error) => {
                    setAlertInfo({
                        title: 'Erro!',
                        description: 'Ocorreu um erro ao cadastrar o produto!',
                        severity: 'error',
                    });

                    handleAlert();
                });


                loadProducts();
            });
        });

        handleCancel();
    }

    const handleCancel = () => {
        setImage('');
        setSelectedCategory('');

        handleClose();
    }

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handleFile = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setImage(event.target.result as string);
            }

            reader.readAsDataURL(file);
        }
    }

    const [openDialog, setOpenDialog] = useState(false);
    const [excludedProduct, setExcludedProduct] = useState({} as any);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = (product) => {
        setExcludedProduct(product);
        handleClickOpenDialog();
    }

    const handleConfirmDelete = () => {
        db.collection('products').doc(excludedProduct.productId).delete().then(() => {
            loadProducts();

            setAlertInfo({
                title: 'Produto excluído',
                description: 'O produto foi excluído com sucesso.',
                severity: 'success',
            });

            handleAlert();
        }).catch((error) => {
            console.error('Error removing document: ', error);

            setAlertInfo({
                title: 'Erro ao excluir produto',
                description: 'Ocorreu um erro ao excluir o produto.',
                severity: 'error',
            });

            handleAlert();
        });

        handleCloseDialog();
        setExcludedProduct({} as any);
    }

    const [productEdit, setProductEdit] = useState({} as any);
    const [imageEdit, setImageEdit] = useState(null);
    const [selectedCategoryEdit, setSelectedCategoryEdit] = useState('');

    const handleEdit = (product) => {
        setProductEdit(product);

        setImageEdit(product.image);
        setSelectedCategoryEdit(product.category);

        handleOpenEdit();
    }

    const handleSubmitEdit = (event) => {
        event.preventDefault();

        const data = {};

        if (event.target.name.value !== productEdit.name) {
            data['name'] = event.target.name.value;
        }

        if (event.target.category.value !== productEdit.category) {
            data['category'] = event.target.category.value;
        }

        if (event.target.description.value !== productEdit.description) {
            data['description'] = event.target.description.value;
        }

        if (event.target.price.value !== productEdit.price) {
            data['price'] = event.target.price.value;
        }

        if (event.target.quantity.value !== productEdit.quantity) {
            data['quantity'] = event.target.quantity.value;
        }

        if (imageEdit !== productEdit.image && imageEdit) {
            const byteString = atob(imageEdit.split(',')[1]);
            const mimeString = imageEdit.split(',')[0].split(':')[1].split(';')[0]
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([ab], { type: mimeString });

            storage.ref(`images/${v4()}.png`).put(blob).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    data['image'] = url;

                    db.collection('products').doc(productEdit.productId).update(data).then(() => {
                        loadProducts();

                        setAlertInfo({
                            title: 'Produto editado',
                            description: 'O produto foi editado com sucesso.',
                            severity: 'success',
                        });

                        handleAlert();
                    }).catch((error) => {
                        console.error('Error updating document: ', error);

                        setAlertInfo({
                            title: 'Erro ao editar produto',
                            description: 'Ocorreu um erro ao editar o produto.',
                            severity: 'error',
                        });

                        handleAlert();
                    });
                });
            }).catch((error) => {
                console.error('Error uploading file: ', error);
            });

            handleCancelEdit();
            return;
        }

        db.collection('products').doc(productEdit.productId).update(data).then(() => {
            loadProducts();

            setAlertInfo({
                title: 'Produto editado',
                description: 'O produto foi editado com sucesso.',
                severity: 'success',
            });

            handleAlert();
        }).catch((error) => {
            console.error('Error updating document: ', error);

            setAlertInfo({
                title: 'Erro ao editar produto',
                description: 'Ocorreu um erro ao editar o produto.',
                severity: 'error',
            });

            handleAlert();
        });

        handleCancelEdit();
    }

    const handleChangeEdit = (event) => {
        setSelectedCategoryEdit(event.target.value);
    }

    const handleFileEdit = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setImageEdit(event.target.result as string);
            }

            reader.readAsDataURL(file);
        }
    }

    const handleCancelEdit = () => {
        setImageEdit(null);
        setSelectedCategoryEdit('');

        handleCloseEdit();
    }

    return (
        <>
            <Grid container>
                <Grid item xs={0} sm={0} md={2} style={{
                    background: `rgb(8, 16, 9)`,
                }}>
                    <Header page="products" title="Produtos" />
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
                            }}>Produtos</h1>

                            <p style={{
                                fontSize: '1rem',
                                fontWeight: 400,
                                color: 'rgb(101, 116, 139)',
                                fontFamily: 'Montserrat, sans-serif',
                                textAlign: 'center'
                            }}>Gerencie os produtos da sua loja</p>
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
                            <CssButton variant="contained" startIcon={<Add />} onClick={handleOpen}>
                                novo
                            </CssButton>
                        </Box>

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
                                                <p>Ações</p>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={product.productId}>
                                                    {
                                                        columns.map((column) => (
                                                            column[1] === 'image' ? (
                                                                <TableCell key={column[1]}>
                                                                    <img src={product[column[1]]} alt={product.name} style={{
                                                                        width: '50px',
                                                                        height: '50px',
                                                                        objectFit: 'contain',
                                                                    }} />
                                                                </TableCell>
                                                            ) : (
                                                                <TableCell key={column[1]}>
                                                                    {
                                                                        column[1] === 'price' ? (
                                                                            new Intl.NumberFormat('pt-BR', {
                                                                                style: 'currency',
                                                                                currency: 'BRL'
                                                                            }).format(product[column[1]])
                                                                        ) : (
                                                                            product[column[1]]
                                                                        )
                                                                    }
                                                                </TableCell>
                                                            )
                                                        ))
                                                    }

                                                    <TableCell>
                                                        <IconButton aria-label="delete" size="small" onClick={() => handleDelete(product)}>
                                                            <Delete fontSize="inherit" />
                                                        </IconButton>
                                                        <IconButton aria-label="delete" size="small" onClick={() => handleEdit(product)}>
                                                            <Edit fontSize="inherit" />
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
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Main>
                    <Footer />
                </Grid>
            </Grid>
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
                    }}>Novo produto</h6>
                    <p id="modal-modal-description" style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'rgb(101, 116, 139)',
                        marginBottom: '8px',
                    }}>Preencha os campos abaixo para criar um novo produto</p>

                    <Divider style={{
                        marginBottom: '48px',
                        marginTop: '24px',
                    }} />

                    <form onSubmit={handleSubmit}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '16px',
                            }}>
                                <CssTextField fullWidth label="Nome" variant="outlined" size="small" name="name" required />
                                <CssTextField fullWidth label="Descrição" variant="outlined" size="small" name="description" />
                                <CssFormControl sx={{
                                    minWidth: 120,
                                    width: '100%',
                                }} size="small">
                                    <InputLabel id="demo-select-small">Categoria</InputLabel>
                                    <CssSelect
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={selectedCategory}
                                        label="Categoria"
                                        onChange={handleChange}
                                        name="category"
                                        required
                                    >
                                        {
                                            categories.map((category) => (
                                                <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                                            ))
                                        }
                                    </CssSelect>
                                </CssFormControl>
                                <CssTextField fullWidth label="Preço" variant="outlined" size="small" name="price" type="number" required />
                                <CssTextField fullWidth label="Quantidade" variant="outlined" size="small" name="quantity" type="number" required />
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                gap: '16px',
                                marginTop: '32px',
                            }}>
                                <InputLabel>Imagem</InputLabel>
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '16px',
                                }}>
                                    {
                                        image && (
                                            <img src={image} alt="preview" style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'contain',
                                            }} />
                                        )
                                    }
                                    <CssButton variant="contained">
                                        <input
                                            accept="image/*"
                                            type="file"
                                            hidden
                                            onChange={handleFile}
                                            name="image"
                                            required
                                            id="contained-button-file2"
                                        />
                                        <label htmlFor="contained-button-file2">
                                            <PhotoCamera fontSize="medium" />
                                        </label>
                                    </CssButton>
                                    {
                                        image && (
                                            <CssButtonCancel variant="contained" onClick={() => setImage(null)}>
                                                <Delete fontSize="medium" />
                                            </CssButtonCancel>
                                        )
                                    }
                                </Box>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '16px',
                                marginTop: '48px',
                            }}>
                                <CssButtonCancel variant="contained" onClick={handleCancel}>
                                    Cancelar
                                </CssButtonCancel>
                                <CssButton variant="contained" type="submit">
                                    Salvar
                                </CssButton>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Modal>
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title-edit"
                aria-describedby="modal-modal-description-edit"
            >
                <Box sx={style}>
                    <h6 id="modal-modal-title" style={{
                        fontSize: '1.25rem',
                        fontWeight: 500,
                        color: '#1A2027',
                        marginBottom: '8px',
                        fontFamily: 'Roboto, sans-serif',
                    }}>Editar Produto</h6>
                    <p id="modal-modal-description" style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'rgb(101, 116, 139)',
                        marginBottom: '8px',
                    }}>Edite as informações do produto</p>

                    <Divider style={{
                        marginBottom: '48px',
                        marginTop: '24px',
                    }} />

                    <form onSubmit={handleSubmitEdit}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '16px',
                            }}>
                                <CssTextField fullWidth label="Nome" variant="outlined" size="small" name="name" defaultValue={productEdit.name} required />
                                <CssTextField fullWidth label="Descrição" variant="outlined" size="small" name="description" defaultValue={productEdit.description} />
                                <CssFormControl sx={{
                                    minWidth: 120,
                                    width: '100%',
                                }} size="small">
                                    <InputLabel id="demo-select-small">Categoria</InputLabel>
                                    <CssSelect
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={selectedCategoryEdit}
                                        label="Categoria"
                                        onChange={handleChangeEdit}
                                        name="category"
                                        required
                                    >
                                        {
                                            categories.map((category) => (
                                                <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                                            ))
                                        }
                                    </CssSelect>
                                </CssFormControl>
                                <CssTextField fullWidth label="Preço" variant="outlined" size="small" name="price" type="number" defaultValue={productEdit.price} required ></CssTextField>
                                <CssTextField fullWidth label="Quantidade" variant="outlined" size="small" name="quantity" type="number" defaultValue={productEdit.quantity} required />
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                gap: '16px',
                                marginTop: '32px',
                            }}>
                                <InputLabel>Imagem</InputLabel>
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '16px',
                                }}>
                                    {
                                        imageEdit && (
                                            <img src={imageEdit} alt="preview" style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'contain',
                                            }} />
                                        )
                                    }
                                    <CssButton variant="contained">
                                        <input
                                            accept="image/*"
                                            type="file"
                                            hidden
                                            onChange={handleFile}
                                            name="image"
                                            required
                                            id="contained-button-file1"
                                        />
                                        <label htmlFor="contained-button-file1">
                                            <PhotoCamera fontSize="medium" />
                                        </label>
                                    </CssButton>
                                    {
                                        imageEdit && (
                                            <CssButtonCancel variant="contained" onClick={() => setImageEdit(null)}>
                                                <Delete fontSize="medium" />
                                            </CssButtonCancel>
                                        )
                                    }
                                </Box>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '16px',
                                marginTop: '48px',
                            }}>
                                <CssButtonCancel variant="contained" onClick={handleCancelEdit}>
                                    Cancelar
                                </CssButtonCancel>
                                <CssButton variant="contained" type="submit">
                                    Salvar
                                </CssButton>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Modal>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deseja realmente excluir este produto?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <strong>Nome:</strong> {excludedProduct?.name}
                        <br />
                        <strong>Descrição:</strong> {excludedProduct?.description}
                        <br />
                        <strong>Categoria:</strong> {excludedProduct?.category}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>
                        Cancelar
                    </Button>
                    <CssButtonCancelDialog onClick={() => handleConfirmDelete()} autoFocus>
                        Excluir
                    </CssButtonCancelDialog>
                </DialogActions>
            </Dialog>
            <Box sx={{
                position: 'absolute',
                top: '80px',
                right: '0',
                animation: 'slideIn 0.5s ease-in-out',
            }}>
                {
                    alert && (
                        <Alert severity={alertInfo.severity} sx={{
                            animation: 'slideIn 0.5s ease-in-out',
                        }}>
                            <AlertTitle>{alertInfo.title}</AlertTitle>
                            {alertInfo.description}
                        </Alert>
                    )
                }
            </Box>
        </>
    )
}
