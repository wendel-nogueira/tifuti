import { Box } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { House, Clock, Barcode, Storefront, Gauge } from 'phosphor-react';
import styled from "styled-components";


interface HeaderProps extends React.PropsWithChildren<{}> {
    username: string;
    userType: string;
    profilePicture: string;
    page: string;
    title: string;
}

const ListItem = ({ children, currentPage, userType }: { children: React.ReactNode, currentPage: string, userType: string }) => {
    return (
        <li style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px 16px',
            flexGrow: 1,
            gap: '4px',
        }}>
            {children}

            {
                userType === 'shop' && (
                    <Link page="dashboard" currentPage={currentPage}>
                        <Gauge size={20} weight="light" />

                        <span style={{
                            marginLeft: '4px',
                            fontSize: '1rem',
                            fontWeight: 500,
                        }}>Dashboard</span>
                    </Link>
                )
            }

            {
                userType === 'shop' && (
                    <Link page="products" currentPage={currentPage}>
                        <Barcode size={20} weight="light" />

                        <span style={{
                            marginLeft: '4px',
                            fontSize: '1rem',
                            fontWeight: 500,
                        }}>Produtos</span>
                    </Link>
                )
            }

            {
                userType === 'shop' && (
                    <Link page="orders" currentPage={currentPage}>
                        <Storefront size={20} weight="light" />

                        <span style={{
                            marginLeft: '4px',
                            fontSize: '1rem',
                            fontWeight: 500,
                        }}>Pedidos</span>
                    </Link>
                )
            }
        </li>
    )
}

const Link = ({ children, page, currentPage }: { children: React.ReactNode, page: string, currentPage: string }) => {
    const HeadLink = styled.a`
        display: flex;
        align-items: center;
        width: 100%;
        padding: 9px 24px;
        color: ${page === currentPage ? '#47A359' : '#F9FAFC'};
        border-radius: 8px;
        transition: 0.6s;
        background: ${page === currentPage ? 'rgba(255, 255, 255, 0.08)' : 'transparent'};

        &:hover {
            background: rgba(255, 255, 255, 0.08);
            color: ${page === currentPage ? '#47A359' : '#F9FAFC'};
        }
    `;

    return (
        <HeadLink href={page}>
            {children}
        </HeadLink>
    )
}

export default function Header(props: HeaderProps) {
    const router = useRouter();
    let page = router.pathname;
    const title = props.title;

    if (page.replace('/', '') !== '') {
        page = page.replace('/', '');
    }

    return (
        <>
            <Head>
                <title>{title + ' | tifuti'}</title>
            </Head>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '100px',
                    padding: '24px',
                }}
            >
                <p style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#47A359',
                    fontFamily: 'Montserrat, sans-serif',
                }}>tifuti</p>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '100px',
                padding: '4px 16px',
            }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    padding: '11px 24px',
                    background: `rgba(255, 255, 255, 0.04)`,
                    borderRadius: '8px',
                }}>
                    <p style={{
                        fontSize: '1.2rem',
                        fontWeight: 500,
                        color: '#fff',
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom: '10px',
                    }}>Olá, {props.username}</p>

                    <p style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'rgb(149, 149, 150)',
                    }}>
                        {props.userType === 'shop' ? 'vendedor' : 'comprador'}
                    </p>
                </Box>
            </Box>

            <span style={{
                width: '100%',
                height: '1px',
                background: `rgb(61, 65, 71)`,
                display: 'block',
                margin: '24px 0',
            }}></span>

            <nav>
                <ul>
                    <ListItem currentPage={page} userType={props.userType}>
                        <Link page="/" currentPage={page}>
                            <House size={20} weight="light" />

                            <span style={{
                                marginLeft: '4px',
                                fontSize: '1rem',
                                fontWeight: 500,
                            }}>Home</span>
                        </Link>
                        <Link page="history" currentPage={page}>
                            <Clock size={20} weight="light" />

                            <span style={{
                                marginLeft: '4px',
                                fontSize: '1rem',
                                fontWeight: 500,
                            }}>Histórico</span>
                        </Link>
                    </ListItem>
                </ul>
            </nav>

            <span style={{
                width: '100%',
                height: '1px',
                background: `rgb(61, 65, 71)`,
                display: 'block',
                margin: '24px 0',
            }}></span>
        </>
    )
}