import { Heading } from '@chakra-ui/react'

const CustomHeading = ({ size, margin, text}) => {
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
