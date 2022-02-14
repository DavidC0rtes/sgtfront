/**
 * Este archivo manda todas las peticiones que tienen que ver con los usuarios
 */
const baseUrl = process.env.REACT_APP_API_URL

/**
 * Obtiene todos los usuarios del proyecto, i.e: manda una petición
 * GET a baseUrl/busqueda_usuarios
 *
 * @return array
 */
const getAll = async () => {
    const response = await fetch(`${baseUrl}/busqueda_usuario/?id=&nombre=&rol=&contrasena=`)
    const data = await response.json();

    return data
}

const getByUsername = async (username) => {
    const response = await fetch(`${baseUrl}/busqueda_usuario/?id=&nombre=${username}&rol=&contrasena=`)
    const data = await response.json();

    return data
}

// eslint-disable-next-line
export default {
    getAll
}
