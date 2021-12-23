import React,{useMemo, useState } from "react";

import { useTheme } from "../../hooks/theme";

import emojis from "../../utils/emojis";

import Toggle from "../Toggle";

import { Container, Profile, Welcome, UserName } from "./styles";

const MainHeader: React.FC = ()=> {

    const {toggleTheme, theme} = useTheme();

    const [isDarkTheme, setTheme] = useState(()=> theme.title==='dark'? true: false);


    const emoji = useMemo(()=>{
        const indece = Math.floor(Math.random()*emojis.length);
        return emojis[indece];
    },[]);

    const handleChageTheme = ()=>{
        setTheme(!isDarkTheme);
        toggleTheme();
    }

    return (
        <Container>
            <Toggle
                labelLeft="Light"
                labelRight="Dark"
                checked={isDarkTheme}
                onChange={handleChageTheme}
            />
            <Profile>
                <Welcome>Olá, {emoji} </Welcome>
                <UserName>Pedro Marinho</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader; 