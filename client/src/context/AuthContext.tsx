import React, { createContext, useContext, useState } from 'react'

interface AuthContextProps {
    token: string | null
    setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextProps>({
    token: null,
    setToken: () => {}
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
    return (
        <AuthContext.Provider value={{ token, setToken: updateToken }}>
            {children}
        </AuthContext.Provider>
    )
}
