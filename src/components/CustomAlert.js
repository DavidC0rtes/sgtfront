import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const CustomAlert = ({ msg, type }) => {
    if (msg === null) {
        return (
            <div></div>
        )
    }

    return (
        <Alert status={type}>
            <AlertIcon />
            <AlertDescription>{msg}</AlertDescription>
        </Alert>
    )
}

export default CustomAlert
