/**
 * Este archivo manda todas las peticiones que tienen que ver con los clientes
 */
const baseUrl = process.env.REACT_APP_API_URL

const getAll = async () => {
    const response = await fetch(`${baseUrl}/busqueda_cliente/?cedula=`)
    const data = await response.json()
    return data
}

const getByCC = async (cc) => {
    const response = await fetch(`${baseUrl}/busqueda_cliente/?cedula=${cc}`)
    const data = await response.json()
    return data
}

// eslint-disable-next-line
export default {
    getAll,
    getByCC
}
