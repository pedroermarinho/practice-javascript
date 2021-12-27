import styled,{keyframes} from "styled-components";


const animate = keyframes`

    0% {
        transform: translateX(100px);
        opacity: 0;
    }
    50% {
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }

`;
export const Container = styled.div `
    width: 100%;
    
    display: flex;
    flex-direction: column;
 

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;

    padding: 30px 20px;
    margin: 10px 0;

    animation: ${animate} .5s;
`;
export const ChartContainer = styled.div `
    
    height: 400px;
`;

export const Header = styled.header `
    display: flex;
    justify-content: space-between;

    width: 100%;
    >h2{
        margin-bottom: 20px;
        padding-left: 17px;
    }

    @media(max-width: 1200px){
        flex-direction: column             ;
    }
`;

export const LegendContainer = styled.ul `
    list-style:none ;
    display: flex;
    padding-right: 21px;
`;

interface ILegendPros{
    color:string;
}

export const Legend = styled.li<ILegendPros> `
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    margin-left: 16px;
    font-size: 14px;

    >div {
        background-color: ${props => props.color};

        width: 40px;
        height: 40px;
        border-radius: 5px;

        font-size: 14px;
        line-height: 40px;
        text-align: center;
    }

    >span{
        padding-left: 5px;
    }

    @media(max-width: 1280px){
        >div {
            width: 40px;
            height: 40px;
        }
    }
`;