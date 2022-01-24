import { Heading } from '@chakra-ui/react'

const CustomHeading = ({ size, text, margin }) => {
    return (
        <Heading
            size={size}
            margin={margin}
        >
            {text}
        </Heading>
    )
}

export default CustomHeading
