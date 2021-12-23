import React, {ButtonHTMLAttributes} from "react";

import { Container } from "./styles";

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<IButtonProps> = ({ ...rest}) =>{
    return (
        <Container {...rest}>

        </Container>
    );
}

export default Button;