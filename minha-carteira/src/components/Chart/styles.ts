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


interface ILegendPros{
    color:string;
}






export const Container = styled.div `
    width: 48%;
    height: 260px;

    margin: 10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;

    display: flex;

    animation: ${animate} .5s;

    @media(max-width: 770px){
        display: flex;
        width: 100%;
    }
`;

export const SideLeft = styled.aside `
    padding: 30px 20px;

    > h2{
        margin-bottom: 20px;
    }

    @media(max-width: 1345px){
        padding: 0 15px 5px;
        margin-bottom: 7px;

        > h2 {
            margin-top: 15px;
            margin-bottom: 7px;
        }
    }

    @media(max-width: 420px){
        padding: 15px;
        margin-bottom: 7px                        ;
    }
`;
export const Legend = styled.li<ILegendPros> `
    display: flex;
    align-items: center;

    margin-bottom: 7px;
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

    @media(max-width: 145px){
        font-size: 14px;
        margin: 3px 0;

        > div{
            height: 35px;
            width: 35px;
            line-height: 35;
        }

        >span {
            margin-left: 7px;
        }
    }

`;

export const LegendContainer = styled.ul `
    list-style: none;

    height: 175px;
    padding-right: 15px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: ${props=>props.theme.colors.secondary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track{
        background-color: ${props => props.theme.colors.tertiary};
    }

    @media(max-width: 1345){
        display: flex;
        flex-direction: column;
    }
`;

export const SideRight = styled.main `

    display: flex;
    flex: 1;
    justify-content: center;

    @media(max-width: 1345px){
        height: 100%;
    }
`;