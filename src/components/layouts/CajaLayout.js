import React from 'react'
import { Heading, SimpleGrid, Flex, Spacer, Square, Box } from '@chakra-ui/react'

const CajaLayout = () => {
    return (
        <div id='main' style={{opacity: '1', textAlign:'center'}}>
            <Heading size='4xl' margin='1.2em 0'>Cajas</Heading>
            <SimpleGrid columns={2} spacing={10}>
                <Flex color= 'white'>
                    <Square bg='white' size='150px'>
                        1
                    </Square>
                    <Spacer />
                    <Box p='4'bg='white'>
                        Atiende
                    </Box>
                </Flex>
            </SimpleGrid>
            
        </div>
    )
}