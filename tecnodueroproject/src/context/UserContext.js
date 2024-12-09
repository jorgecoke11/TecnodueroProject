import React, {useState} from "react";

const Context = React.createContext({})
export function UserContextProvider ({children}){
    const [jwt, setJWT] = useState(() => window.localStorage.getItem('loggedAppUser'))
    const [username, setUsername] = useState(() => window.localStorage.getItem('loggedAppUsername'));
    return <Context.Provider value={{jwt, setJWT, username, setUsername}}>
        {children}
    </Context.Provider>
}
export default Context