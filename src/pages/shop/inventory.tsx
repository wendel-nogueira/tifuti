import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { StyledMain } from '../../components/main/Main'
import { useAuth } from '../../hooks/useAuth'
import { UserTypes } from '../../utils/enums/UserType'

export default function Inventory() {
    const { user } = useAuth();

    console.log(user); // null

    return (
        <>
            <Header userType={UserTypes.shop} title="Estoque" />
            
            <StyledMain>
                <h1>Inventory</h1>
            </StyledMain>

            <Footer />
        </>
    )
}