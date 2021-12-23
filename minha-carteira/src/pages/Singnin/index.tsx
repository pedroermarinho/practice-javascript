import React from "react";

import { Container, Logo, Form, FormTitle } from "./styles";

import logoImg from '../../assets/logo.svg';

import Input from "../../components/input";

import Button from "../../components/Button";

const SingIn: React.FC = ()=> {
    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>
            <Form onSubmit={()=>{}}>
                <FormTitle>Entrar</FormTitle>
                <Input 
                    type='email'
                    placeholder="e-mail"
                    required
                />
                <Input 
                    type='password'
                    placeholder="senha"
                    required
                />
                <Button type="submit">
                    Acessar
                </Button>
                
            </Form>
        </Container>
    );
}

export default SingIn ; 