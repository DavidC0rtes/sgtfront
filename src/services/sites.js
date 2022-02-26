/**
 * Este archivo manda todas las peticiones que tienen que ver con las sedes y las cajas de cada cede
 *  Asi que también trata con sede_caja y usuario_sede_caja
 */

 const baseUrl = process.env.REACT_APP_API_URL

 //SEDES

 const getAllSites = async () => {
    const response = await fetch(`${baseUrl}/busqueda_caja/?id=&numero_caja=&tipo=`)
    const data = await response.json()
    return data
}

//TODO: Abstraer todas estas de abajo en una sola, para manejar combinaciones y no ser tan pleb. Debería ser sencillo.
const getSiteByID = async (id) => {
    const response = await fetch(`${baseUrl}/busqueda_sede/?id=${id}&nombre=&direccion=`)
    const data = await response.json()
    return data
}

//Cajas de sede

const getAllSitesBoxes = async () => {
    const response = await fetch(`${baseUrl}/busqueda_sede_caja/?id=&id_caja=&id_sede=`)
    const data = await response.json()
    return data
}

//Usuarios de las cajas de la sede

const getAllSiteClockedUsers = async () => {
    const response = await fetch(`${baseUrl}/busqueda_usuario_sede_caja/?id=&fecha=&id_sede_caja=&id_usuario=`)
    const data = await response.json()
    return data
}

//Crear nuevo registro a selección del usuario

const userClockInSite = async (id_caja, id_usuario) => {
    const response = await fetch(`${baseUrl}/crear_usuario_sede_caja/?id=&fecha=&id_sede_caja=${id_caja}&id_usuario=${id_usuario}`)
    const data = await response.json()
    return data
}

const exportedObject = {
    getAllSites,
    getSiteByID,
    getAllSitesBoxes,
    getAllSiteClockedUsers,
    userClockInSite
}

export default exportedObject;