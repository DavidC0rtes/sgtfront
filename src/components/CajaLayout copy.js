import React from 'react'
import { Heading, SimpleGrid, HStack, VStack, Flex, Spacer, Square, Box, extendTheme, Text } from '@chakra-ui/react'
import cajaService from '../services/handler.js'


//El clásico método de tiempos inmemoriables (exactamente 9 meses)
var cajas = cajaService.getAll().then(function(cats) {cajas = cats})

const theme = extendTheme ({ //no sirve, averiguar que pasa luego
    textStyles: {
        h1: {
          // you can also use responsive styles
          fontSize: ['48px', '72px'],
          fontWeight: 'bold',
          lineHeight: '110%',
          color: 'black',
          letterSpacing: '-2%',
        },
        h2: {
          fontSize: ['36px', '48px'],
          fontWeight: 'semibold',
          lineHeight: '110%',
          letterSpacing: '-1%',
        },
        paragraph: {
            fontSize: ['16px', '28px'],
            fontWeight: 'normal',
            lineheight: '100%',
            color: 'green',
            letterSpacing: '-1%',
        },
      },
    })



const CajaLayout = () => {
    
    return (
        <div id='main' style={{opacity: '1', textAlign:'center'}}>
            <Heading size='4xl' margin='1.2em 0'>Cajas</Heading>
            <SimpleGrid columns={1} spacing={1}>
                <HStack color= 'black'  spacing='22px'>
                    <Square bg='white' rounded='md' color='black' size='70px' border='1px' borderColor='gray'>
                        <Text fontWeight='bold'>2</Text>
                    </Square>
                    <VStack spacing={0} align='start'>
                        <Flex>
                            <Text fontWeight='bold'>Atiende:</Text>
                            <Text>Jose Alejandro Hurtado</Text>
                        </Flex>
                        <Flex>
                            <Text fontWeight='bold'>Tipo de Transacción:</Text>
                            <Text>Dolares</Text>
                        </Flex>
                    </VStack>
                </HStack>
                <HStack color= 'white'>
                    <Square bg='white' color= 'black' rounded='md' size='70px' border='1px' borderColor='gray'>
                        1
                    </Square>
                    <Box p='2'bg='white' color='black' m='2' border='1px' borderColor='black'>
                        Atiendesss Jose alejandro Hurtado Cuero
                    </Box>
                </HStack>
                <HStack color= 'white'>
                    <Square bg='white' color= 'black' rounded='md' size='70px' border='1px' borderColor='gray'>
                        1
                    </Square>
                    <Box p='4'bg='red'>
                        Atiendesss
                    </Box>
                </HStack>

            </SimpleGrid>
            
        </div>
    )
}

export default CajaLayout