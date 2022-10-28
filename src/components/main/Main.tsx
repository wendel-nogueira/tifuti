import styled from "styled-components";

export const StyledMain = styled.main`
    width: 100%;
    max-width: 1300px;
    min-height: calc(100vh - 140px);
    display: flex;
    justify-content: center;
    margin: 0 auto;

    @media (max-width: 768px) {
        min-height: calc(100vh - 120px);
    }
`;