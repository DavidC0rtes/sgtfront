import { useState } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react' 

const EmployeeForm = () => {
    const [state, setState] = useState({ username: '', password: ''})

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
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
                <Input id="username" type="text" size='lg' value={state.username} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired marginBottom='1em'>
                <FormLabel html-for="password" fontSize='calc(0.75em + 1vmin)'>Contraseña</FormLabel>
                <Input id="password" type="password" size='lg' value={state.password} onChange={handleChange} />
            </FormControl>
            <Button type="submit" colorScheme="cyan" size="lg">Entrar</Button>
        </form>
    )
}

export default EmployeeForm
