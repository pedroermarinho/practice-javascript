import React from "react";

import ContentHeader from "../../components/ContentHeader";
import SelecInput from "../../components/SelectInput";

import { Container } from "./styles";


const Dashboard: React.FC = ()=> {
    const options = [
        {value: 'Teste1', label: 'Teste1'},
        {value: 'Teste2', label: 'Teste2'},
        {value: 'Teste3', label: 'Teste3'},
    ];

    return (
        <Container>
            <ContentHeader title="Dasborad" lineColor="#fff">
                <SelecInput options={options}></SelecInput>
            </ContentHeader>
        </Container>
    );
}

export default Dashboard; 