// sessionData.js
import jwtDecode from "jwt-decode";

export function isTokenExpired(token) {
    try {
        const { exp } = jwtDecode(token); // Decodifica el token
        const now = Date.now() / 1000; // Tiempo actual en segundos
        return exp < now; // Verifica si ya caducó
    } catch (error) {
        return true; // Si falla, lo consideramos como expirado
    }
}
