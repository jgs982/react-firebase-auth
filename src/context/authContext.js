import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
}
from 'firebase/auth'




const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error("There is no Auth provider")
    return context 
}

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    
    const [user, setUser] = useState(null)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const loginWithGoogle = () => {

        const googleProvider = new GoogleAuthProvider()

        return (
            signInWithPopup(auth, googleProvider)
        )        
    }

    const logout = () => signOut(auth)

    const resetPassword = async (email) => sendPasswordResetEmail(auth, email)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        // Función que se ejecuta al desmontar el componente
        return (
            () => unsubscribe()
        )

    }, [])

    return (
        <authContext.Provider
            value={{
                signup,
                login,
                loginWithGoogle,
                logout,
                user,
                loading,
                resetPassword 
            }}
        >
            {children}
        </authContext.Provider>
    )
}