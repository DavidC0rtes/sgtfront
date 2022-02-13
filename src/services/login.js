/**
 * Este archivo manda todas las peticiones que tienen que ver con los inicios de sesión
 */


const baseUrl = 'https://wwwproject.herokuapp.com/busqueda_usuario'

const login = async ({ username, password }) => {
    const response = await fetch(`${baseUrl}/?id=&nombre=${username}&rol=&contrasena=${password}`)

    const data = await response.json()
    return data
}

export default {
    login
}
