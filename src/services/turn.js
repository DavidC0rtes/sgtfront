const baseUrl = process.env.REACT_APP_API_URL

const getTurn = async(body) => {
    const response = await fetch(`${baseUrl}/busqueda_turno/` + 
        `?codigo=${body.codigo || ''}&` + 
        `tipo=${body.tipo || ''}&` + 
        `cedula_cliente=${body.cc || ''}&`+
        `prioridad=${body.prioridad || ''}`)

    const data = await response.json();
    return data
}

const requestTurn = async({cc, tipo}) => {
    const response = await fetch(`${baseUrl}/crear_turno/?tipo=${tipo}&cedula_cliente=${cc}&prioridad=`)
    return response
}

// eslint-disable-next-line
export default {
    getTurn,
    requestTurn
}
