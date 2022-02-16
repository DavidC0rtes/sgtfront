import {React, useState} from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    useRadioGroup,
    Spinner,
    useToast,
} from '@chakra-ui/react' 

import RadioCard from '../RadioCard'
import clientService from '../../services/client'

const ClientForm = () => {
    const [state, setState] = useState({ fullname: '', cc: '', caja: ''})
    const [showSpinner, setSpinner] = useState(false)
    const actions = ['general', 'ie', 's', 'd', 'vip']
    const text = ['General', 'Importaciones/Exportaciones', 'Seguros', 'Dólares', 'VIP']
    const toast = useToast()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const res = await clientService.getByCC(state.cc)
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
            <FormControl isRequired marginBottom='1em'>
                <FormLabel html-for="fullname" fontSize='calc(0.75em + 1vmin)'>Nombre completo</FormLabel>
                <Input borderColor='black' id="fullname" variant='filled' type="text" size='lg' value={state.fullname} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired marginBottom='1em'>
                <FormLabel html-for="cc" fontSize='calc(0.75em + 1vmin)'>Identificación</FormLabel>
                <Input id="cc" borderColor='black' type="text" variant='filled' size='lg' pattern="[0-9]{5,11}" value={state.cc} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel html-for="caja" fontSize='calc(0.75em + 1vmin)' >Tipo de transacción</FormLabel>
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

export default ClientForm
