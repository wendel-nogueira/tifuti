import React from 'react'
import { AppProps } from 'next/app'
import GlobalStyle from '../styles/global'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from '../contexts/CartContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <CartProvider>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                    <GlobalStyle />
                </ThemeProvider>
            </CartProvider>
        </AuthProvider>
    )
}

export default MyApp
