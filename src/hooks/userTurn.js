import React, { useState, useContext, createContext } from "react"

import userTurnService from '../services/request_turn'

const turnContext = createContext()

// Componente proveedor del contexto turn a todos los componentes debajo de él (children)
// No estaba seguro si añadir mi turno al hook useTurn sobreescribiría así que decidí hacer otro por si algo
export function ProvideTurn({ children }) {
    const turn = useProvideTurn()
    return <turnContext.Provider value={turn}>{children}</turnContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useTurn = () => {
    return useContext(turnContext)
}

// Provider hook that creates auth object and handles state
function useProvideTurn() {
    const [state, setState] = useState(JSON.parse(window.localStorage.getItem('turn')))
    
    /**
     * Métodos para manipular el estado del usuario
     */

    /**
     * Pide un turno al backend, lo recibe y lo guarda en localStorage 
     * @param {object} body 
     */
    const requestTurn = async (body) => {
        const res = await userTurnService.requestTurn({caja: body.caja, tipo: body.tipo})
        if (res.status === 200) {
            return res
        } else {
           throw new Error('Ha ocurrido un error generando su turno.')
        } 

    }
    
    /**
     *  ¿Tal vez en algún momento sea necesario? 
     */
    const exit = () => { 
        window.localStorage.removeItem('turn');
        setState(null)
    }

    return {
        state,
        requestTurn,
        exit 
    }
}