import { Box, Divider, Modal, TextField, Button } from "@mui/material";
import styled from "styled-components";
import { User, ShoppingCartSimple } from 'phosphor-react';
import { useAuth } from '../../hooks/useAuth';
import { useState } from "react";
import { styled as muiStyled } from '@mui/material/styles';

const ButtonDropdown = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    cursor: pointer;
    transition: 0.4s ease 0s;

    &:hover {
        background: rgba(55, 65, 81, 0.04);
    }
`;

const BackgroundIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border-radius: 50%;
    transition: 0.4s ease 0s;

    &:hover {
        background: rgba(55, 65, 81, 0.04);
    }
`;

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

const CssButton = styled(Button)({
    background: '#47A359',
    '&:hover': {
        background: '#398748',
    }
});

export default function Main({ children }) {
    const { user, signOut } = useAuth();
    const userPicture = '';
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const hover = (e) => {
        let dropdown = e.target.parentElement.querySelector('.dropdown') ?? e.target.querySelector('.dropdown') ?? e.target.parentElement.parentElement.querySelector('.dropdown');

        if (dropdown) {
            dropdown.style.display = 'block';
        }
    }

    const hoverOut = (e) => {
        let dropdown = e.target.parentElement.querySelector('.dropdown') ?? e.target.querySelector('.dropdown') ?? e.target.parentElement.parentElement.querySelector('.dropdown');

        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }

    const handleFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target) {
                    const image = e.target.result;
                    console.log(image);
                }
            }

            reader.readAsDataURL(file);
        }
    }

    return (
        <main style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'calc(100vh - 50px)',
            width: '100%',
        }}>
            <Box sx={{
                background: '#FFF',
                width: '100%',
                minHeight: '65px',
                boxShadow: 'rgb(100 116 139 / 12%) 0px 1px 4px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
            }}>
                <Box sx={{
                    marginLeft: 'auto',
                    marginRight: '40px',
                    cursor: 'pointer',
                    position: 'relative',
                }} onMouseEnter={(e) => hover(e)} onMouseLeave={(e) => hoverOut(e)}>
                    <BackgroundIcon>
                        <ShoppingCartSimple size={20} weight="fill" color="rgb(101, 116, 139)" style={{
                            margin: 'auto',
                        }} />

                        <span style={{
                            position: 'absolute',
                            top: '0px',
                            right: '0px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: '#47A359',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                        }}>{items.length}</span>
                    </BackgroundIcon>

                    <Box sx={{
                        background: '#fff',
                        position: 'absolute',
                        right: '0',
                        boxShadow: 'rgb(31 41 55 / 6%) 0px 2px 4px, rgb(100 116 139 / 12%) 0px 4px 6px',
                        borderRadius: '8px',
                        minWidth: '300px',
                        display: 'none',
                        transition: 'all 0.8s ease 0s',
                        padding: '12px 16px',
                        zIndex: 1,
                    }} className="dropdown">
                        {
                            items.length === 0 && (
                                <p style={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: 'rgb(101, 116, 139)',
                                    textAlign: 'center',
                                }}>Nenhum item no carrinho :(</p>
                            )
                        }
                    </Box>
                </Box>
                <Box sx={{
                    cursor: 'pointer',
                    position: 'relative',
                }} onMouseEnter={(e) => hover(e)} onMouseLeave={(e) => hoverOut(e)}>
                    <Box sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgb(230, 232, 240)',
                    }}>
                        {
                            !userPicture || userPicture === '' ? (
                                <User size={24} weight="light" color="rgb(230, 232, 240)" />
                            ) : (
                                <img src={userPicture} alt="Foto de perfil" style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                }} />
                            )
                        }
                    </Box>
                    <Box sx={{
                        background: '#fff',
                        position: 'absolute',
                        right: '0',
                        boxShadow: 'rgb(31 41 55 / 6%) 0px 2px 4px, rgb(100 116 139 / 12%) 0px 4px 6px',
                        borderRadius: '8px',
                        minWidth: '150px',
                        display: 'none',
                        transition: 'all 0.8s ease 0s',
                        zIndex: 1,
                    }} className="dropdown">
                        <ButtonDropdown onClick={handleOpen}>
                            <p style={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: 'rgb(101, 116, 139)',
                            }}>perfil</p>
                        </ButtonDropdown>

                        <Divider />

                        <ButtonDropdown onClick={() => signOut()}>
                            <p style={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: 'rgb(101, 116, 139)',
                            }}>sair</p>
                        </ButtonDropdown>
                    </Box>
                </Box>
            </Box>

            {children}

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
                    }}>Meu perfil</h6>
                    <p id="modal-modal-description" style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'rgb(101, 116, 139)',
                        marginBottom: '8px',
                    }}>Você pode editar suas informações pessoais aqui.</p>

                    <Divider style={{
                        marginBottom: '48px',
                        marginTop: '24px',
                    }} />

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        marginTop: '24px',
                        gap: '24px',
                    }}>
                        <Box sx={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgb(230, 232, 240)',
                        }}>
                            {
                                !userPicture || userPicture === '' ? (
                                    <User size={48} weight="light" color="rgb(230, 232, 240)" />
                                ) : (
                                    <img src={userPicture} alt="Foto de perfil" style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                    }} />
                                )
                            }
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={(e) => handleFile(e)}
                            />
                            <label htmlFor="contained-button-file">
                                <CssButton variant="contained">
                                    Upload
                                </CssButton>
                            </label>
                            <p style={{
                                fontSize: '1rem',
                                fontWeight: 400,
                                color: 'rgb(101, 116, 139)',
                            }}>Alterar foto</p>
                        </Box>
                        <CssTextField
                            //error
                            id="standard-error-helper-text"
                            label="Nome"
                            defaultValue="Hello World"
                            //helperText="Seu nome completo"
                            variant="standard"
                            type={"text"}
                            sx={{
                                width: '100%',
                            }}
                        />

                        <CssTextField
                            //error
                            id="standard-error-helper-text"
                            label="Email"
                            defaultValue="Hello World"
                            //helperText="Seu email"
                            variant="standard"
                            type={"email"}
                            sx={{
                                width: '100%',
                            }}
                        />

                        <CssButton variant="contained">Salvar</CssButton>
                    </Box>
                </Box>
            </Modal>
        </main>
    )
}