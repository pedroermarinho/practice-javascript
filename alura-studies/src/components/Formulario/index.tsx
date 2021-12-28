import React from "react";
import Botao from "../Botao";
import style from './Formulario.module.scss';
import {ITarefa} from "../../types/tarefa";

import { v4 as uuidv4} from 'uuid';

interface ISetTarefa {
    setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>
}


class Formulario extends React.Component<ISetTarefa> {
    state = {
        tarefa: "",
        tempo: "00:00"
    }

    adicionarTarefa(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.setTarefas(tarefasAntigas =>
            [
                ...tarefasAntigas,
                {
                    ...this.state,
                    selecionado:false,
                    completado:false
                }
            ]
        );
        this.setState({
            tarefa: "",
            tempo: "00:00"
        })
    }

    render(): React.ReactNode {
        return (
            <form className={style.novaTarefa} onSubmit={this.adicionarTarefa.bind(this)}>
                <div className={style.inputContainer}>
                    <label htmlFor="tarefa">
                        Adicione um novo estudo
                    </label>
                    <input
                        type="text"
                        name="tarefa"
                        id="tarefa"
                        value={this.state.tarefa}
                        onChange={event => this.setState({...this, tarefa: event.target.value})}
                        placeholder="O que você quer estudar"
                        required
                    />
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="tempo">
                        Tempo
                    </label>
                    <input
                        type="time"
                        step="1"
                        name="tempo"
                        value={this.state.tempo}
                        onChange={event => this.setState({...this, tempo: event.target.value})}
                        id="tempo"
                        min="00:00:00"
                        max="01:30:00"
                        required
                    />
                </div>
                <Botao type="submit">
                    Adicionar
                </Botao>
            </form>
        );
    }
}


export default Formulario;