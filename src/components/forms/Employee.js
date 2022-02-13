import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useAuth } from '../../hooks/useAuth'
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react' 
import { useNavigate } from "react-router-dom";


const EmployeeForm = () => {
    const [state, setState] = useState({ username: '', password: ''})
    const auth = useAuth()
    const toast = useToast()
    const toastID = 'toast-login'
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await auth.login(state)
            navigate("/")
        } catch(err) {
            console.log(err)
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
            <Button type="submit" colorScheme="cyan" size="lg">Entrar</Button>
        </form>
    )
}

export default EmployeeForm
