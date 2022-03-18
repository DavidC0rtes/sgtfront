import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const SignOut = ({signout}) => {
    const navigate = useNavigate()

    const handleClick = () => {
	signout()
	navigate("/")
    }
    return(
	<Button size='sm' colorScheme='red' onClick={handleClick}>
	    Salir
	</Button>
    )
}

export default SignOut
