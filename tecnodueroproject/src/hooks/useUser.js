import { useCallback, useContext, useState } from 'react'
import Context from '../context/UserContext'
import loginService from '../services/login'
export default function useUser(){
    const {jwt, setJWT, username, setUsername} = useContext(Context)
    const [state, setState] = useState({loading: false, error:false})
    const login = useCallback(async ({username, passWord}) =>{
       try{

           const response = await loginService.login({
               username, 
               passWord
            })
            window.sessionStorage.setItem('loggedAppUser', response.token)
            window.sessionStorage.setItem('loggedAppUsername', response.username);
            setState({loading: false, error:false})
            setJWT(response.token)
            setUsername(response.username)
        }catch(error){
            setState({loading: false, error:true})
            console.error(error)
        }
            
    },[setJWT])
    return {
        jwt: 'Bearer '+ jwt,
        username: username,
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login
    }
}