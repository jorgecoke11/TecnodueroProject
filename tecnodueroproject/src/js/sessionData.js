// sessionData.js
class SessionData {
    constructor() {
      this.token = null;
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