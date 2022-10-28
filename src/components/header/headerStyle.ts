import styled from "styled-components";


export const StyledHeader = styled.header`
    width: 100%;
    max-width: 1300px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 20px 32px;

    & .header-title {
        font-family: ${props => props.theme.fonts.primary};
        font-size: 2rem;
        font-weight: 600;
        line-height: 40px;
        display: flex;
        align-items: center;
    }
    
    & .header-title a {
        color: ${props => props.theme.colors.text_tertiary};
    }
    
    & .header-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: auto;
    }
    
    & .header-nav-list {
        display: flex;
        align-items: center;
        column-gap: 24px;
        width: 100%;
        margin-right: 32px;
    }
    
    & .header-nav-item {
        font-family: ${props => props.theme.fonts.primary};
        color: ${props => props.theme.colors.text_tertiary};
        font-size: 1.25rem;
        font-weight: 300;
        line-height: 30px;
    }
    
    & .header-nav-item:hover a {
        color: ${props => props.theme.colors.text_tertiary};
    }
    
    & .header-nav-item::after {
        content: '';
        display: block;
        width: 0;
        height: 2px;
        background: ${props => props.theme.colors.text_tertiary};
        transition: width 0.3s;
    }
    
    & .header-nav-item:hover::after {
        width: 100%;
        transition: width ${props => props.theme.transitions.duration} ${props => props.theme.transitions.timing_function};
    }
    
    & .header-nav-item.active a {
        color: ${props => props.theme.colors.text_tertiary};
    }
    
    & .header-nav-item.active::after {
        width: 100%;
    }
    
    & .header-user {
        display: flex;
        align-items: center;
        column-gap: 16px;
        position: relative;
    }
    
    & .header-user:hover>.header-user-dropdown {
        display: block;
    }
    
    & .header-user-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${props => props.theme.colors.background_secondary};
        border: 1px solid ${props => props.theme.colors.border_tertiary};
        cursor: pointer;
    }
    
    & .header-user-dropdown {
        position: absolute;
        top: calc(100% + 16px);
        right: 0;
        width: 150px;
        padding: 8px 0px;
        background: ${props => props.theme.colors.background_secondary};
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1;
        display: none;
    }
    
    & .header-user-dropdown::before {
        content: '';
        position: absolute;
        top: -16px;
        right: 0px;
        width: 100%;
        height: 16px;
    }
    
    & .header-user-dropdown-item {
        font-family: ${props => props.theme.fonts.secondary};
        color: ${props => props.theme.colors.text_tertiary};
        font-size: 1rem;
        font-weight: 400;
        line-height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        column-gap: 16px;
        transition: color ${props => props.theme.transitions.duration} ${props => props.theme.transitions.timing_function};
        padding: 0px 16px;
    }
    
    & .header-user-dropdown-item:hover {
        background: ${props => props.theme.colors.background_tertiary};
        color: ${props => props.theme.fonts.secondary};
    }
    
    & .mobile-menu-icon {
        display: none;
    }

    @media (max-width: 768px) {
        padding: 20px 16px;
        height: 60px;
    
        .header-title {
            font-size: 1.5rem;
            line-height: 30px;
        }
    
        .header-nav {
            background: ${props => props.theme.colors.background_secondary};
            position: fixed;
            top: 0;
            left: 0;
            max-width: 300px;
            height: 100%;
            padding: 0px 96px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            z-index: 2;
            transform: translateX(-100%);
            transition: transform ${props => props.theme.transitions.duration} ${props => props.theme.transitions.timing_function};
        }
    
        .header-nav-background {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            z-index: 1;
            opacity: 0;
            display: none;
            transition: opacity ${props => props.theme.transitions.duration} ${props => props.theme.transitions.timing_function};
        }
    
        .header-nav.active {
            transform: translateX(0%);
        }
    
        .header-nav.active~.header-nav-background {
            opacity: 1;
            display: block;
            visibility: visible;
        }
    
        .header-nav-list {
            flex-direction: column;
            row-gap: 16px;
            margin: 32px 0px;
            padding: 16px 0px;
        }
    
        .header-nav-item {
            font-size: 1.25rem;
            line-height: 30px;
        }
    
        .header-nav-item::after {
            display: none;
        }
    
        .header-user {
            width: 100%;
            flex-direction: column;
            row-gap: 8px;
            margin-top: auto;
            margin-bottom: 32px;
        }
    
        .header-user-dropdown {
            position: static;
            width: 100%;
            padding: 0px;
            box-shadow: none;
            display: flex;
            flex-direction: column;
            row-gap: 8px;
            background: ${props => props.theme.colors.background_secondary};
        }
    
        .header-user-dropdown::before {
            display: none;
        }
    
        .header-user-dropdown-item {
            color: ${props => props.theme.colors.text_secondary};
        }
    
        .header-user-dropdown-item:hover {
            color: ${props => props.theme.colors.text_tertiary};
        }
    
        .mobile-menu-icon {
            display: block;
            cursor: pointer;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${props => props.theme.colors.text_secondary};
        }
    
        .mobile-menu-icon:hover {
            color: ${props => props.theme.colors.text_tertiary};
        }
    
        .mobile-menu-icon.active {
            color: ${props => props.theme.colors.text_tertiary};
        }
    
        .header-nav .mobile-menu-icon {
            margin: 0px auto 64px;
        }
    }
    
    @media (max-width: 480px) {}
    
    @media (max-width: 375px) {
        .header-title {
            font-size: 1.25rem;
        }
    
        .header-nav {
            padding: 0px 64px;
            align-items: flex-start;
            justify-content: flex-start;
        }
    
        .header-nav-list {
            row-gap: 8px;
            margin: 32px 0px;
            padding: 16px 0px;
        }
    
        .header-nav-item {
            font-size: 1rem;
        }
    }
`;