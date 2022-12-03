import { createGlobalStyle } from "styled-components";
import styled from 'styled-components'

export const varianBodyStyle = createGlobalStyle`
    body {
        background: red;
    }
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: ${ props => props.theme.colors.background_primary };
    background: red;
`;

export default createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        font-family: ${ props => props.theme.fonts.secondary };
        background: ${ props => props.theme.colors.background_primary };
        font-size: 16px;
    }

    a {
        text-decoration: none;
        color: ${ props => props.theme.colors.text_secondary };
        transition: color ${ props => props.theme.transitions.duration } ${ props => props.theme.transitions.timing_function };
    }

    a:hover {
        color: ${ props => props.theme.colors.text_tertiary };
    }

    li {
        list-style: none;
    }
`;

export const SocialLoginButton = styled.button`
    width: 250px;
    padding: 10px 22px;
    border-radius: 5px;
    font-family: ${ props => props.theme.fonts.primary };
    font-size: 14px;
    font-weight: 400;
    background-color: #fff;
    display: flex;
    align-items: center;
    column-gap: 16px;
    box-shadow: 4px 4px 20px 10px rgba(0, 0, 0, 0.1); 
    border: 0;
    transition: filter ${ props => props.theme.transitions.duration } ${ props => props.theme.transitions.timing_function };
    cursor: pointer;
`