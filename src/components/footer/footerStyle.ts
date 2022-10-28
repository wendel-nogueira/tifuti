import styled from "styled-components";

export const StyledFooter = styled.footer`
    width: 100%;
    max-width: 1300px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    & .footer-link {
        font-size: 1rem;
    }

    & .footer-name {
        font-weight: 600;
    }

    @media (max-width: 768px) {
        height: 60px;

        .footer-link {
            font-size: 0.8rem;
        }
    }
`;