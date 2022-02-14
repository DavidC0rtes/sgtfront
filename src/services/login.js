/**
 * Este archivo manda todas las peticiones que tienen que ver con los inicios de sesión
 */


const baseUrl = process.env.REACT_APP_API_URL

const login = async ({ username, password }) => {
    const response = await fetch(`${baseUrl}/busqueda_usuario/?id=&nombre=${username}&rol=&contrasena=${password}`)

    const data = await response.json()
    return data
}

export default {
    login
}
