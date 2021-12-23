import React, {InputHTMLAttributes} from "react";

import { Container } from "./styles";

type IInpuntProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<IInpuntProps> = ({ ...rest}) =>{
    return (
        <Container {...rest}>

        </Container>
    );
}

export default Input;