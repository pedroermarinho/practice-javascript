import {useState} from "react";
import style from './Lista.module.scss';
import Item from "./Item";
import {ITarefa} from "../../types/tarefa";


interface Props {
    tarefas:ITarefa[],
    selecionaTarefa:(tarefaSelecionada:ITarefa) => void
}


function Lista(
    {tarefas, selecionaTarefa}:Props
) {


    return (
        <aside className={style.listaTarefas}>
            <h2> Estudos do dia</h2>
            <ul>
                {tarefas.map((item, index) => {
                    return (
                        <Item
                            selecionaTarefa={selecionaTarefa}
                            {...item}
                            key={index}
                        />
                    )
                })}
            </ul>
        </aside>
    )
}

export default Lista;