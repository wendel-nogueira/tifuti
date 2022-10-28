import { createGlobalStyle } from "styled-components";
import styled from 'styled-components'

export default createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        font-family: ${ props => props.theme.fonts.secondary };
        background-color: ${ props => props.theme.colors.background_primary };
        color: ${ props => props.theme.colors.text_secondary };
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

export const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

export const Section = styled.section`
    padding: 100px 0;
`;