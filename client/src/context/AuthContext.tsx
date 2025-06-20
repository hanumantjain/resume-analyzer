import React, { createContext, useContext, useState } from 'react'

interface AuthContextProps {
    token: string | null
    setToken: (token: string | null) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
    token: null,
    setToken: () => {},
    logout: () => {}
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

    const updateToken = ( newToken: string | null) => {
        if(newToken){
            localStorage.setItem('token', newToken)
        } else{
            localStorage.removeItem('token')
        }
        setToken(newToken)
    }
    const logout = () => {
        updateToken(null)
    }
    return (
        <AuthContext.Provider value={{ token, setToken: updateToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
