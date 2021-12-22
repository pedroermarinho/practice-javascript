
import styled from "styled-components";

export const Container = styled.div`

    background-color: ${props=>props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;
    
    width: 48%;
    min-height: 260px;

    margin: 10px 0;

`;

export const SideLeft = styled.aside`
    padding: 30px 20px;

    >h2{
        padding-left: 16px;
        margin-bottom: 10px;
    }
`;
export const SideRight = styled.main`
    flex: 1;
`;