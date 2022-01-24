import React from 'react'

import { Heading, Grid, GridItem, Image} from '@chakra-ui/react'
import ClientForm from '../components/forms/Client'


const Client = () => {

    return (
        <>
        <Heading size='4xl' margin='0.8em auto 1em'>
            Ingresa tus datos
        </Heading>
        <Grid id="grid-client" templateColumns='repeat(5, 1fr)' gap={5}>
            <GridItem colSpan={3}>
                <ClientForm />
            </GridItem>
            <GridItem colSpan={2}>
                <Image
                    alt="Usuario"
                    src="https://images.unsplash.com/photo-1601597110547-78516f198ce4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                    boxSize='300px'
                    objectFit='cover'
                    border='2px solid black'
                    borderRadius='1em'
                />
            </GridItem>
        </Grid>
        </>
    )
}

export default Client
