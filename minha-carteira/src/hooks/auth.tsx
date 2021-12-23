import React,{ createContext, useState, useContext} from "react";

interface IAuthContext{
    logged : boolean;
    singIn(email:string, password:string):void;
    singOut:void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({children})=>{

    const [logged, setLoggerd] = useState<boolean>(()=>{
        const isLpgged = localStorage.getItem('@minha-carteira:logged');

        return !!isLpgged;
    });

    const signIn = (email:string, password:string )=>{
        if(email==='teste@teste.com' && password ==='123'){
            localStorage.setItem('@minha-carteira:logged', 'true');
            setLoggerd(true);
        }
    }

    return (
        <>
            {children}
        </>
    )
}