import React from "react";
import MainMenu from './MainMenu'
import Notification from "./Notification";
const Home = (user) => {
    console.log(user)
    return (
        <div className='App'>
            {user ? <MainMenu/> : <Notification message={'Sesion no iniciada'}></Notification>}
        </div>
    );
};

export default Home;
