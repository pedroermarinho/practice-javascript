import Botao from "../Botao";
import Relogio from "./Relogio";
import style from "./Cronomentro.module.scss";

export default function Cronomentro(){
    return (
        <div className={style.cronometro}>
            <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
            <div className={style.relogioWrapper}>
                <Relogio/>
            </div>
            <Botao>
                Começar
            </Botao>
        </div>
    )
}