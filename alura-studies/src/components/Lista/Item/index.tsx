import style from "../Lista.module.scss";

export default function Item(props: {tarefa: string, tempo:string}) {
    return (
        <li className={style.item}>
            <h3>
                {props.tarefa}
            </h3>
            <span>
                {props.tempo}
            </span>
        </li>
    );
}