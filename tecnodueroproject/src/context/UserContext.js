import React, {useState} from "react";

const Context = React.createContext({})
export function UserContextProvider ({children}){
    const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('loggedAppUser'))
    const [username, setUsername] = useState(() => window.sessionStorage.getItem('loggedAppUsername'));
    return <Context.Provider value={{jwt, setJWT, username, setUsername}}>
        {children}
    </Context.Provider>
}
export default Context