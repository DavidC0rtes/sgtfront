import { useState, useRef } from 'react'
import { useToast } from '@chakra-ui/react'
import { useAuth } from '../../hooks/useAuth'
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react' 
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha'

const EmployeeForm = () => {
    const [state, setState] = useState({ username: '', password: ''})
    const [validCaptcha, setValidCaptcha] = useState(false)
    const auth = useAuth()
    const toast = useToast()
    const toastID = 'toast-login'
    const navigate = useNavigate()
    const captcha = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await auth.login(state)
            navigate("dashboard")
        } catch(err) {
            console.error(err)
            if (!toast.isActive(toastID)) {
                toast({
                    title: 'Contraseña y/o correo electrónico inválidos' ,
                    duration: 4000,
                    isClosable: false,
                    status: 'error'
                })
            }
        }
    }

    const handleChange = (event) => {
        const key = event.target.id ? event.target.id : event.target.name 
        const obj = {}
        obj[key] = event.target.value

        const prevState = JSON.parse(JSON.stringify(state))
        setState({ ...prevState, ...obj })
    }

    return (
        <form id="form-empleado" onSubmit={handleSubmit}>
            <FormControl isRequired marginBottom='1em'>
                <FormLabel html-for="username" fontSize='calc(0.75em + 1vmin)'>Nombre de usuario</FormLabel>
                <Input id="username" type="text" size='lg' variant="filled" value={state.username} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired marginBottom='1em'>
                <FormLabel html-for="password" fontSize='calc(0.75em + 1vmin)'>Contraseña</FormLabel>
                <Input id="password" type="password" variant="filled" size='lg' value={state.password} onChange={handleChange} />
            </FormControl>
	    
	    <ReCAPTCHA
	        ref={captcha}
	        sitekey='6LdQh-0eAAAAAEPTIGibJMNxh8bkRyQsL2L9XoAS'
	        onChange={() => setValidCaptcha(true)}
	        onExpired={() => setValidCaptcha(false)}
	        hl='es-419'
	    />
            <Button mt='0.5em'isDisabled={!validCaptcha} type="submit" colorScheme="cyan" size="lg">Entrar</Button>
        </form>
    )
}

export default EmployeeForm
