import React,{ createContext, useState, useContext} from "react";

interface IAuthContext{
    logged : boolean;
    singIn(email:string, password:string):void;
    singOut():void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({children})=>{

    const [logged, setLoggerd] = useState<boolean>(()=>{
        const isLpgged = localStorage.getItem('@minha-carteira:logged');

        return !!isLpgged;
    });

    const singIn = (email:string, password:string )=>{
        if(email==='teste@teste.com' && password ==='123'){
            localStorage.setItem('@minha-carteira:logged', 'true');
            setLoggerd(true);
        }else{
            alert('Senha ou usuário inválidos!');
        }
    }

    const singOut = ()=>{
        localStorage.removeItem('@minha-carteira:logged');
        setLoggerd(false);
    }

    return (
        < AuthContext.Provider value={{logged, singIn, singOut}}>
            {children}
        </AuthContext.Provider>
    )
}
function useAuth():IAuthContext{
    const context = useContext(AuthContext);

    return context;
}


export {AuthProvider,useAuth};