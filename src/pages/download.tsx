import Head from 'next/head'
import Footer from '../components/footer/Footer'
import { StyledMain } from '../components/main/Main'

export default function Home() {
    return (
        <>
            <Head>
                <title>Download</title>
            </Head>

            <StyledMain>
                <h1>Download</h1>
            </StyledMain>

            <Footer />
        </>
    )
}