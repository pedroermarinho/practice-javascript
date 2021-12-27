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


interface ITagProps{
    color: string;
}

export const Container = styled.li `

    background-color: ${props => props.theme.colors.tertiary};

    list-style: none;
    border-radius: 10px;

    margin: 10px 0;
    padding: 12px 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;

    cursor: pointer;
    transition: all .3s;
    
    &:hover{
        opacity: .7;
        transform: translateX(10px);
    }



    >div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        padding-left: 10px;
    }
    >div span{
        font-size: 22px;
        font-weight: 500;
    }

    animation: ${animate} .5s;

`;

export const Tag = styled.div<ITagProps> `
    position: absolute;
    background-color: ${props => props.color};
    width: 15px;
    height:  60%;
    left: 0;


`;