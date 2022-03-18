/**
 * Este archivo manda las peticiones de para obtener los reportes
 */

 const baseUrl = process.env.REACT_APP_API_URL

 const getVipReport = async () => {
     const response = await fetch(`${baseUrl}/estadistica_turnos_vip/?`)
     const data = await response.json()
     return data
 }
 const getTurnosReport = async () => {
    const response = await fetch(`${baseUrl}/estadistica_turnos_por_tipo/?`)
    const data = await response.json()
    return data
}

const getTurnosSedeReport = async (id_sede) => {
    const response = await fetch(`${baseUrl}/estadistica_turnos_por_sede/?id_sede=${id_sede}`)
    const data = await response.json()
    return data
}

 
 // eslint-disable-next-line
 const exportedObject ={
    getVipReport,
    getTurnosReport,
    getTurnosSedeReport
 }
 export default exportedObject;