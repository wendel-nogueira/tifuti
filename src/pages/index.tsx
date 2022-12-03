import Head from 'next/head'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { StyledMain } from '../components/main/Main'
import { UserTypes } from '../utils/enums/UserType'
import { useAuth } from '../hooks/useAuth';

export default function Home() {
    const { user } = useAuth();

    console.log(user); // null
    
    return (
        <>
            <Header userType={UserTypes.shop} />

            <StyledMain>
                <h1>Home</h1>
            </StyledMain>

            <Footer />
        </>
    )
}