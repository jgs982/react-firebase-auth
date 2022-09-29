import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from './Alert'


export const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')

    const { login, loginWithGoogle, resetPassword } = useAuth()

    const navigate = useNavigate()

    const handleChange = ({ target:{name, value} }) => {

        setUser({
            ...user,
            [name]: value 
        })
    }

    const handleSubmit = async(e) => {

        e.preventDefault()

        setError('')

        try 
        {
            await login(user.email, user.password)
            navigate('/')

        }
        catch(error)
        {
           setError(error.message)          
        }        
    }

    const handleGoogleSignIn = async() => {
        try 
        {
            await loginWithGoogle()
            navigate('/')   
        } 
        catch(error)
        {
            setError(error.message)   
        }
    }

    const handleResetPassword = async (e) => {
        
        e.preventDefault()

        if (!user.email) return setError("Write an email to reset password")

        try
        {
            await resetPassword(user.email)
            setError('We sent you an email. Check your inbox')
        }
        catch(error)
        {
            setError(error.message);
        }
    }

    return (
        <div className="w-full max-w-xs m-auto">
            {
                error && <Alert message={error}/>
            }

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        htmlFor='email'
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        placeholder='youremail@company.ltd'
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor='password'
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='******'
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>

                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="#!"
                        onClick={handleResetPassword}
                    >
                        Forgot Password?
                    </a>
                </div>
            </form>

            <button
                onClick={handleGoogleSignIn}
                className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
            >
                Google login
            </button>

            <p className="my-4 text-sm flex justify-between px-3">
                Don't have an account?
                <Link
                    to="/register"
                    className="text-blue-700 hover:text-blue-900"
                >
                    Register
                </Link>
            </p>            
        </div>        
    )
}