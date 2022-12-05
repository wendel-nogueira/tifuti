import { createGlobalStyle } from "styled-components";

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
