import { createContext, useState, useContext } from "react";

export const  StateContext = createContext({
    tokenData : '',
 });

export const ContexProvider = ({children}) => {
    const [tokenData, setTokenData] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState({});
    return (
        <>
        <StateContext.Provider value={{tokenData, setTokenData, user, setUser}}> 
            {children}
        </StateContext.Provider>
        </>
    )
}

export const useStateContext = () => useContext(StateContext);