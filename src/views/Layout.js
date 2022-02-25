import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'

const Layout = ({ children }) => {
    const navigate = useNavigate()
    return (
      <Container id="root" height='100vh' maxW='container.xl' centerContent
        backgroundColor="#abb1dc">
        <Breadcrumb marginTop='1em'>
            <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/")}>
                    Inicio
                </BreadcrumbLink>
                {children}
            </BreadcrumbItem>
        </Breadcrumb>
        <Outlet />
      </Container>
    )
}

export default Layout
