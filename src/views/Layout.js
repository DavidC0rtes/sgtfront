import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'

const Layout = () => {
    return (
      <Container id="root" height='100vh' maxW='container.xl' centerContent
        backgroundColor="#abb1dc">
        <Breadcrumb marginTop='1em'>
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to ="/">
                    Inicio
                </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Outlet />
      </Container>
    )
}

export default Layout
