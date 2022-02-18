/**
 * Este archivo manda todas las peticiones que tienen que ver con las cajas
 * Necesito pensar un nombre bueno en inglés, tecnicamente es algo como bank teller pero no sé.
 */

 const baseUrl = process.env.REACT_APP_API_URL

 const getAll = async () => {
    const response = await fetch(`${baseUrl}/busqueda_caja/?id=&numero_caja=&tipo=`)
    const data = await response.json()
    return data
}

//TODO: Abstraer todas estas de abajo en una sola, para manejar combinaciones y no ser tan pleb. Debería ser sencillo.
const getByID = async (id) => {
    const response = await fetch(`${baseUrl}/busqueda_caja/?id=${id}&numero_caja=&tipo=`)
    const data = await response.json()
    return data
}


const exportedObject = {
    getAll,
    getByID
}

export default exportedObject;