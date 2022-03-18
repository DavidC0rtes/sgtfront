const baseUrl = process.env.REACT_APP_API_URL

const get = async(body) => {
    const response = await fetch(`${baseUrl}/busqueda_caja/` + 
        `?id=${body.id || ''}&` + 
        `numero_caja=${body.numero_caja || ''}&` + 
        `tipo=${body.tipo || ''}&`)

    const data = await response.json();
    return data
}

// eslint-disable-next-line
export default {
    get,
}
