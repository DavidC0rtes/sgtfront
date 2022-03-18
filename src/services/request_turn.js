
/**
 * Este archivo manda las peticiones de para pedir turno
 */

const baseUrl = process.env.REACT_APP_API_URL

const request_turn = async ({ id_sede_caja, tipo }) => {
    const response = await fetch(`${baseUrl}/pedir_turno/?id_sede_caja=${id_sede_caja}&tipo=${tipo}`)

    const data = await response.json()
    return data
}

// eslint-disable-next-line
export default {
    request_turn
}
