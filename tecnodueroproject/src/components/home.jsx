import React from "react";
import MainMenu from './MainMenu'
import Notification from "./Notification";
import useUser from "../hooks/useUser";
import Login from "../components/login";
const Home = () => {
    const {isLogged,login} = useUser()
    return (
        <div className='App'>
            {isLogged ? <MainMenu/> : <Login></Login>}
        </div>
    );
};

export default Home;
