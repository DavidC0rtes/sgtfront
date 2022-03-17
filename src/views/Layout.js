import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import ModalSede from '../components/ModalSede'

const Layout = ({ children }) => {
    const navigate = useNavigate()
    return (
      <Container id="root" height='100vh' maxH='100vh' maxW='100vw' centerContent
        backgroundColor="#abb1dc">
        <Breadcrumb marginTop='1em'>
            <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/")}>
                    Inicio
                </BreadcrumbLink>
                {children}
            </BreadcrumbItem>
	    <BreadcrumbItem>
		<ModalSede/>
	    </BreadcrumbItem>
        </Breadcrumb>
        <Outlet />
      </Container>
    )
}

export default Layout
