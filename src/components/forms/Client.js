import { useState, useRef } from 'react'
import { useTurn } from '../../hooks/useTurn'
import ReCAPTCHA from 'react-google-recaptcha'

import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    useRadioGroup,
    Spinner,
    useToast,
    Checkbox, 
} from '@chakra-ui/react' 

import RadioCard from '../RadioCard'
import clientService from '../../services/client'
import turnService from '../../services/turn'
import { useNavigate } from "react-router-dom";

const ClientForm = () => {
    const [state, setState] = useState({ fullname: '', cc: '', caja: '', vip: false})
    const [validCaptcha, setValidCaptcha] = useState(false)
    const [showSpinner, setSpinner] = useState(false)
    const turn = useTurn()
    const actions = ['G', 'IE', 'S', 'D']
    const text = ['General', 'Importaciones/Exportaciones', 'Seguros', 'Dólares', 'VIP']
    const toast = useToast()
    const navigate = useNavigate()
    const captcha = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setSpinner(true) 

        try {
            await turn.requestTurn({cc: state.cc, tipo: state.caja, vip: state.vip})
            navigate("turn")
        } catch(err) {
            console.err(err)
            toast({
                title: '¡Oops!',
                description: 'Ha ocurrido un error, intente más tarde.',
                status: 'error',
                duration: 4000,
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
	    if (key === 'vip') {
		obj[key] = !state.vip
	    } else {
		obj[key] = event.target.value
	    }
	    console.log(obj)
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
	    <FormControl>
		<Checkbox id='vip' mt='1.5em' value={state.vip} onChange={handleChange}>
		    Soy V.I.P
		</Checkbox>
	    </FormControl>
	    <Stack id="captcha-button" direction={['column', 'row']}>
		<ReCAPTCHA
		    ref={captcha}
		    sitekey='6LdQh-0eAAAAAEPTIGibJMNxh8bkRyQsL2L9XoAS'
		    onChange={() => setValidCaptcha(true)}
		    onExpired={() => setValidCaptcha(false)}
		    hl='es-419'
		/>
		<Button type="submit" colorScheme='yellow' marginTop='1em' size='lg' isDisabled={!validCaptcha}>
		    Listo
		</Button>
	    </Stack>
            { showSpinner && <Spinner size='lg' />}
        </form>
    )
}

export default ClientForm
