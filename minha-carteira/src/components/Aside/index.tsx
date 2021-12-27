import React ,{useState}from "react";
import logoImg from '../../assets/logo.svg'

import { MdDashboard, MdArrowDownward, MdArrowUpward,MdExitToApp, MdClose,MdMenu} from 'react-icons/md';

import { Container, Header, LogImg,MenuContainer,MenuItemLink, Title, ToggleMenu, ThemeToggleFotter } from "./styles";

import { useAuth } from "../../hooks/auth";

import { useTheme } from "../../hooks/theme";

import Toggle from "../Toggle";

const Aside: React.FC = ()=> {

    const {singOut} = useAuth();
    const {toggleTheme,theme} = useTheme();


    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState<boolean>(true);
    const [isDarkTheme, setTheme] = useState(()=> theme.title==='dark'? true: false);

    const handleToggleMenu= () =>{
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }

    const handleChageTheme = ()=>{
        setTheme(!isDarkTheme);
        toggleTheme();
    }    

    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpened?<MdMenu/>:<MdClose/>}
                </ToggleMenu>
                <LogImg src={logoImg} alt="Logo Minha Carteira" />
                <Title> Minha Carteira</Title>
            </Header>
            <MenuContainer>
                <MenuItemLink href="/dasboard">
                    <MdDashboard/>
                    Dashbaord
                </MenuItemLink>
                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward/>
                    Entradas
                </MenuItemLink>
                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward/>
                    Saídas
                </MenuItemLink>
                <MenuItemLink onClick={()=> singOut()}>
                    <MdExitToApp/>
                    Sair
                </MenuItemLink>
            </MenuContainer>

            <ThemeToggleFotter menuIsOpen={toggleMenuIsOpened}>
            <Toggle
                labelLeft="Light"
                labelRight="Dark"
                checked={isDarkTheme}
                onChange={handleChageTheme}
            />            
            </ThemeToggleFotter>
            
        </Container>
    );
}

export default Aside; 