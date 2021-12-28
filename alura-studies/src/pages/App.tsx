import React, {useState} from 'react';

import Botao from '../components/Botao';

import Formulario from '../components/Formulario';

import Lista from '../components/Lista';

import style from './App.module.scss'
import Cronomentro from "../components/Cronomentro";
import {ITarefa} from "../types/tarefa";

function App() {

    const [tarefas, setTarefas] = useState<ITarefa[]>([]);
    return (
        <div className={style.AppStyle}>
            <Formulario setTarefas={setTarefas}/>
            <Lista tarefas={tarefas} />
            <Cronomentro/>
        </div>
    );
}

export default App;
