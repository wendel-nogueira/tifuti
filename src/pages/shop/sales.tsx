import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { StyledMain } from '../../components/main/Main'
import { UserTypes } from '../../utils/enums/UserType'

const Sales: React.FC = () => {
    return (
        <>
            <Header userType={UserTypes.shop} />

            <StyledMain>
                <h1>Sales</h1>
            </StyledMain>

            <Footer />
        </>
    )
}

export default Sales