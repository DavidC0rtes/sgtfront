const baseUrl = process.env.REACT_APP_API_URL

const getAll = async() => {
    const res = await fetch(`${baseUrl}/busqueda_sede/?id=&nombre=&direccion=`)
    const data = await res.json()
    return data
}

// eslint-disable-next-line
export default {
    getAll,
}
