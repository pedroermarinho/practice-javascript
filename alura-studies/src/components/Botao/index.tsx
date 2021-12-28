import React from "react";

import style from './Botao.module.scss';

class Botao extends React.Component<{
    type?:"button" | "submit" | "reset" | undefined
}>{

    render(): React.ReactNode {

        const {type = "submit",children} = this.props;

        return (
            <button className={style.botao} type={type}>
                {children}
            </button>
        );
    }
}

export default Botao;