import {React, useState, useEffect, useRef} from 'react'
import { useAuth } from '../../hooks/useAuth'
import {
    FormControl,
    FormLabel,
    Input,
    Grid,
    GridItem,
    Divider,
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
import requestTurnService from '../../services/request_turn'
import GridUserTurn from '../GridUserTurn'

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
    const [state, setState] = useState({ sede: '', caja: '', tipo:''})
    const [value, setValue] = useState('');
    const [turno, setTurno] = useState({tipo_turno:'', codigo:''})
    const [showSpinner, setSpinner] = useState(false)
    const [update, setUpdate] = useState(0) // Para saber si se le ha dado clic a "Actualizar"
    const [cajas, setCajas] = useState([]) //Almacena las cajas de la sede traidas de la base de datos
    const [tipos, setTipos] = useState([]) //Almacena los tipos de cajas registrados en la base de datos (las cajas en backend_cajas)
    const [sedes, setSedes] = useState([]) //Almacena las sedes traidas de la base de datos
    const auth = useAuth()
    const previousUpdate = usePrevious(update)
    var actions = []
    const text = ['General', 'Importaciones/Exportaciones', 'Seguros', 'Dólares', 'VIP']
    const toast = useToast()

    useEffect(() => {   //Javascript es magia negra pana, Brujería.
        const fetchInfo = async () => {
          const result = await siteService.getAllSites() 
          const result2 = await cajaService.getAll()
          setSedes(result)
          setTipos(result2)
        }
    
        // Solo llamar a la función si se le ha dado click
        // al botón de actualizar.
        if (previousUpdate !== update) {
          fetchInfo()
        }
        
      }, [update, previousUpdate])
      console.log(state)
      console.log(setUpdate) //1000000000000000000000000 IQ

    const fetchCajas = async (sede_id) => {
        const result = await siteService.getAllBoxesFromID(sede_id)
        setCajas(result)
    }

    
    //Tenemos que filtrar los tipos de cajas que están en la sede seleccionada.
    const IDscajasDelSitio = cajas.map(value => value.id_caja_id) //Hacemos un Array con las ID de las cajas en la sede
    const cajasDelSitio = tipos.filter(caja => IDscajasDelSitio.includes(caja.id)) //Filtramos las cajas del sitio

    actions = cajasDelSitio.map(function(el){ //Los tipos de cajas que hay en la base de datos (IE, G, etc.)
        return el.tipo
    })


    console.log(tipos)  
    console.log(cajas)
    console.log(IDscajasDelSitio)

    const handleSubmit = async (event) => {
        event.preventDefault()
	
        const res = await siteService.userClockInSite(state.caja, auth.user[0].id)
        setSpinner(true)
        if (res) {
            setSpinner(false)
        } else {
            setSpinner(false)
           // toast({
           //     title: 'No se encuentra',
           //     description: `El cliente con cedula ${state.cc} no se encuentra`,
           //     status: 'error',
           //     duration: 3000,
           //     isClosable: false,
           // })
        }        
    }

    const pedirTurno = async (event) => {
        event.preventDefault()
        console.log(parseInt(state.caja))
        console.log(state.tipo)
        const res = await requestTurnService.requestTurn(state.caja, state.tipo)
        console.log(res)
        if (res) {
            setTurno({tipo_turno:res.tipo, codigo:res.codigo})//cambiar luego
        } else {
            toast({
                title: 'No se encuentra',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
        } 
    }
 

    const handleChange = (event) => {
        const obj = {}
        let key
        if (typeof event === "string") {
            console.log(event)
            obj['caja'] = event[0]
            obj['tipo'] = event.split(',')[1]  
        } else {
            key = event.target.id ? event.target.id : event.target.name 
            obj[key] = event.target.value
            fetchCajas(obj[key])
            console.log(obj)
            setValue(event.target.value)
        }
        console.log(obj)
        const prevState = JSON.parse(JSON.stringify(state))
        setState({ ...prevState, ...obj })
    }
    

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'caja',
        id: 'caja',
        onChange: handleChange
    })

    const group = getRootProps()
    console.log(cajasDelSitio)
    console.log(auth.user[0])
    return (
        <div>
            <Grid
            h='100%'
            w='100%'
            mt='-3em'
            templateColumns='repeat(12,1fr)'
            templateRows='repeat(3,1fr)'
            gap={4}>
            <GridItem rowSpan={3} colSpan={6} mt='1em'>    
            <form id="form-clockIn" onSubmit={handleSubmit}>
            <FormControl isRequired>
                <FormLabel html-for="sede" fontSize='calc(0.75em + 1vmin)' >Sedes</FormLabel>
                <Select id="sede" placeholder="Seleccionar sede"  value={value} onChange={handleChange}>
                    {Object.values(sedes).map((obj) => {
                        return <option key={obj.id} value={obj.id}>{obj.nombre}</option> //Si no ponemos value el asume nombre, pero no queremos buscar por nombre
                    })}
                </Select>
            </FormControl>
            <FormControl>
                <FormLabel html-for="caja" fontSize='calc(0.75em + 1vmin)' >Cajas en la sede</FormLabel>
                <Stack id="caja" name="caja" {...group} direction={['column', 'row']}>
                {cajasDelSitio.map((value) => { //En realidad no selecciona nada
                        const radio = getRadioProps({ value })
                        return (
                            <RadioCard key={value.id} value={[value.id , value.tipo]} {...radio}>
                                {value.tipo}
                            </RadioCard>
                        )
                    })}
                </Stack>
            </FormControl>

            <Button type="submit" colorScheme='yellow' marginTop='1em' size='lg'>Listo</Button>
            { showSpinner && <Spinner size='lg' />}
        </form>
       
        </GridItem>
        <GridItem rowSpan={3} colSpan={6} mt='1e'>
        <GridUserTurn id_sede_caja={state.caja} caja = {state.tipo} turno= {turno.codigo}></GridUserTurn>
        </GridItem>
        </Grid>
        </div>    
    )
}

export default EmployeeClockInForm
