/**
 * Este archivo implementa el manejo del usuario Logueado.
 * Todos los componentes que necesiten acceder a el deben
 * importar este documento.
 */
// https://usehooks.com/useAuth/
// https://reactrouter.com/web/example/auth-workflow

import React, { useState, useContext, createContext } from "react"
import loginService from '../services/login'
import userService from '../services/user'

const authContext = createContext()

// Componente proveedor del contexto auth a todos los componentes debajo de él (children)
export function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext)
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')))
    
    /**
     * Métodos para manipular el estado del usuario
     */

    /**
     * Login de un usuario, el resultado primero se escribe
     * en localStorage y después en el estado user.
     * @param {object} credentials 
     */
    const login = async (credentials) => {
        const result = await loginService.login(credentials)
        if (result.length) {
            window.localStorage.setItem('user', JSON.stringify(result))
            setUser(result)
        } else {
           throw new Error('Nombre de usuario y/o contraseña incorrectas')
        } 

    }
    /**
     * Registrase, crear la cuenta de un usuario nuevo.
     * Acá simplemente se crea la cuenta, por tanto
     * no se escribe a localStorage ni se cambia el estado user.
     * @param {objeto} obj 
     */
    const signup = async (obj) => {
        const newUser = await userService.create(obj)
    }

    /**
     * Simula un cerrado de cesión. Se elimina la entrada user de localStorage
     * y tambien se hace el estado user igual a null.
     */
    const logout = () => { 
        window.localStorage.clear();
        setUser(null)
    }

    return {
        user,
        signup,
        login,
        logout
    }
}
