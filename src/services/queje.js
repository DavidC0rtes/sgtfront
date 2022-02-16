
//const baseUrl = process.env.REACT_APP_API_URL
const baseUrl = 'http://localhost:8000'

const getAll = async() => {
    const response = await fetch(`${baseUrl}/busqueda_caja/?id=&numero_caja=&tipo=`)
    const data = response.json()
    return data
}

const addToQueue = async(type) => {
   //Todo 
}
