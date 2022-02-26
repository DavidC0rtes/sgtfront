import {React, useState, useEffect, useRef} from 'react'
import { useAuth } from '../../hooks/useAuth'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    useRadioGroup,
    Select,
    Spinner,
    useToast,
} from '@chakra-ui/react' 

import RadioCard from '../RadioCard'
import cajaService from '../../services/handler'
import siteService from '../../services/sites'

function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

const EmployeeClockInForm = () => {
    const [state, setState] = useState({ site: '', caja: ''})
    const [showSpinner, setSpinner] = useState(false)
    const auth = useAuth()
    const [update, setUpdate] = useState(0) // Para saber si se le ha dado clic a "Actualizar"
    const [cajas, setCajas] = useState([]) //Almacena las cajas traidas de la base de 
    const [sedes, setSedes] = useState([]) //Almacena las sedes traidas de la base de datos
    const previousUpdate = usePrevious(update)
    const text = ['General', 'Importaciones/Exportaciones', 'Seguros', 'Dólares', 'VIP']
    const toast = useToast()

    useEffect(() => {   //Javascript es magia negra pana, Brujería.
        const fetchSedes = async () => {
          const result = await siteService.getAllSites()
          setSedes(result)
          
        }
    
        // Solo llamar a la función si se le ha dado click
        // al botón de actualizar.
        if (previousUpdate !== update) {
          fetchSedes()
        }
        
      }, [update, previousUpdate])
      console.log(sedes)
      console.log(setUpdate) //1000000000000000000000000 IQ

    const fetchCajas = async () => {
        const result = await siteService.getAllSitesBoxes()
        setCajas(result)
        
      }

    var actions = fetchCajas.map(function(el) {  //Deberia retornar todos los tipos de cajas en la sede
        return el.tipo
    })


    const handleSubmit = async (event) => {
        event.preventDefault()

        const res = await siteService.userClockInSite(state.caja, auth.user.id)
        if (res.length) {
            setSpinner(true) 
        } else {
            toast({
                title: 'No se encuentra',
                description: `El cliente con cedula ${state.cc} no se encuentra`,
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
        }        
    }

    const handleChange = (event) => {
        const obj = {}
        let key
        if (actions.some(x => x === event)) {
            obj['caja'] = event
        } else {
            key = event.target.id ? event.target.id : event.target.name 
            obj[key] = event.target.value
        }

        const prevState = JSON.parse(JSON.stringify(state))
        setState({ ...prevState, ...obj })
    }

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'caja',
        id: 'caja',
        onChange: handleChange
    })

    const group = getRootProps()

    return (
        <form id="form-cliente" onSubmit={handleSubmit}>
            <FormControl isRequired>
                <FormLabel html-for="sede" fontSize='calc(0.75em + 1vmin)' >Sedes</FormLabel>
                {Object.values(sedes).map(Select => {
                    const {id, nombre, direccion} = Select;
                    return(
                        <Select placeholder='Seleccionar sede'>
                            <option value={id}>{nombre}</option>
                        </Select>
                    )
                })}
            </FormControl>
            <FormControl isRequired>
                <FormLabel html-for="caja" fontSize='calc(0.75em + 1vmin)' >Cajas en la sede</FormLabel>
                <Stack id="caja" name="caja" {...group} direction={['column', 'row']}>
                    {actions.map((value, i) => {
                        const radio = getRadioProps({ value })
                        return (
                            <RadioCard key={value} {...radio}>
                                {text[i]}
                            </RadioCard>
                        )
                    })}
                </Stack>
            </FormControl>
            <Button type="submit" colorScheme='yellow' marginTop='1em' size='lg'>Listo</Button>
            { showSpinner && <Spinner size='lg' />}
        </form>
    )
}

export default EmployeeClockInForm
