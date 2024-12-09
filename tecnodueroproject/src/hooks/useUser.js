import { useCallback, useContext, useState , useEffect} from 'react'
import Context from '../context/UserContext'
import loginService from '../services/login'
import { isTokenExpired } from '../js/sessionData.js'
export default function useUser(){
    const {jwt, setJWT, username, setUsername} = useContext(Context)
    const [state, setState] = useState({loading: false, error:false})
    const login = useCallback(async ({username, passWord}) =>{
       try{
           const response = await loginService.login({
               username, 
               passWord
            })
            console.log(response)
            window.localStorage.setItem('loggedAppUser', response.token)
            window.localStorage.setItem('loggedAppUsername', response.username);
            setState({loading: false, error:false})
            setJWT(response.token)
            setUsername(response.username)
        }catch(error){
            setState({loading: false, error:true})
            console.error(error)
        }
            
    },[setJWT])
    useEffect(() => {
        const storedToken = window.localStorage.getItem('loggedAppUser')
        const storedUsername = window.localStorage.getItem('loggedAppUsername')

        if (storedToken && storedUsername && !isTokenExpired(storedToken)) {
            setJWT(storedToken)
            setUsername(storedUsername)
        }
        else{
            window.localStorage.removeItem('loggedAppUser')
            window.localStorage.removeItem('loggedAppUsername')
            setJWT(null)
            setUsername(null)
        }
    }, [setJWT, setUsername])
    return {
        jwt: 'Bearer '+ jwt,
        username: username,
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login
    }
}