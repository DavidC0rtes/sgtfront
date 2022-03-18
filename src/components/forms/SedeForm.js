//import { useState } from 'react'
import { Select } from '@chakra-ui/react'

const SedeForm = ({sedes}) => {
    //const { state, setState } = useState([])

    const handleChange = (e) => {
	window.localStorage.setItem('sede', e.target.value)
    }

    return(
	<Select placeholder='Selecciona una' onChange={handleChange}>
	    {sedes.map((sede, i) => (
		<option key={i} value={sede.id}>{sede.nombre} - {sede.direccion}</option>
	    ))}
	</Select>
    )
}

export default SedeForm
