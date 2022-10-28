import { StyledFooter } from "./footerStyle"

const Footer = () => {
    return (
        <StyledFooter>
            <a href="https://google.com" target="_blank" rel="noreferrer" className="footer-link">
                <span role="img" aria-label="heart">❤️</span>
            </a>
        </StyledFooter>
    )
}

export default Footer