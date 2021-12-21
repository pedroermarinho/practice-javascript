import React,{useMemo } from "react";



import emojis from "../../utils/emojis";

import Toggle from "../Toggle";

import { Container, Profile, Welcome, UserName } from "./styles";

const MainHeader: React.FC = ()=> {

    const emoji = useMemo(()=>{
        const indece = Math.floor(Math.random()*emojis.length);
        return emojis[indece];
    },[]);

    return (
        <Container>
            <Toggle/>
            <Profile>
                <Welcome>Olá, {emoji} </Welcome>
                <UserName>Pedro Marinho</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader; 