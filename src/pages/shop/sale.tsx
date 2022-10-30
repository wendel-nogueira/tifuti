import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { StyledMain } from '../../components/main/Main'
import { UserTypes } from '../../utils/enums/UserType'

export default function Sale() {
    return (
        <>
            <Header userType={UserTypes.shop} />

            <StyledMain>
                <h1>Sale</h1>
            </StyledMain>

            <Footer />
        </>
    )
}