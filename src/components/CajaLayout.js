import React, { useState, useEffect, useRef } from 'react'
import { Heading, SimpleGrid, HStack, VStack, Flex, Square, Text } from '@chakra-ui/react'
import cajaService from '../services/handler.js'


//El clásico método de tiempos inmemoriables (exactamente 9 meses) Edit: no funcionó.
var cajasOld = cajaService.getAll().then(function(cats) {cajasOld = cats})

//El segundo, de hace 4 meses:

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


console.log(cajasOld)

const CajaLayout = () => {

    const [cajas, setCajas] = useState([]) //Almacena las cajas traidas de la base de datos
    const [update, setUpdate] = useState(0) // Para saber si se le ha dado clic a "Actualizar"
    const previousUpdate = usePrevious(update)

    useEffect(() => {   //Javascript es magia negra pana, Brujería.
        const fetchCajas = async () => {
          const result = await cajaService.getAll()
          setCajas(result)
          
        }
    
        // Solo llamar a la función si se le ha dado click
        // al botón de actualizar.
        if (previousUpdate !== update) {
          fetchCajas()
        }
        
      }, [update])
      console.log(cajas)
      console.log(setUpdate) //1000000000000000000000000 IQ
    
    return (
        <div id='main' style={{opacity: '1', textAlign:'center'}}>
            <Heading size='4xl' margin='1.2em 0'>Cajas</Heading>
            <SimpleGrid columns={1} spacing={1}>
            {Object.values(cajas).map(hstack => {
                const {id, numero_caja, tipo} = hstack;               
                return(
                    <HStack color= 'black'  spacing='22px' key={id}>
                        <Square  rounded='md' color='black' size='70px' border='1px' borderColor='gray'>
                            <Text fontWeight='bold' fontSize='32'>{numero_caja}</Text>
                        </Square>
                        <VStack spacing={0} align='start'>
                            <Flex>
                                <Text fontWeight='bold'>Atiende:</Text>
                                <Text>Jose Alejandro Hurtado</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight='bold'>Tipo de Transacción:</Text>
                                <Text>{tipo}</Text>
                            </Flex>
                        </VStack>
                    </HStack>)               
            })}</SimpleGrid>            
        </div>
    )
}

export default CajaLayout