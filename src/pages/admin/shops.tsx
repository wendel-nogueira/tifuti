import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { StyledMain } from '../../components/main/Main'
import { UserTypes } from '../../utils/enums/UserType'

export default function Shops() {
    return (
        <>
            <Header userType={UserTypes.shop} />

            <StyledMain>
                <h1>Shops</h1>
            </StyledMain>

            <Footer />
        </>
    )
}