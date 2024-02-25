// sessionData.js
class SessionData {
    constructor() {
      const loggedUserJson = window.localStorage.getItem('loggedAppUser')
      if(loggedUserJson){
        const user = JSON.parse(loggedUserJson)
        this.token = 'Bearer ' + user.token
      }
    }
  
    setToken(newToken) {
      this.token = `Bearer ${newToken}`;
    }
  
    getToken() {
      return this.token;
    }
  }
  
  const sessionDataInstance = new SessionData();
  export default sessionDataInstance;