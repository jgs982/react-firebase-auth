import { useAuth } from '../context/authContext'


export const Home = () => {

    const { user, logout } = useAuth()

    const handleLogout = async() => {
        try 
        {
            await logout()   
        }
        catch(error)
        {
            console.log(error.message)
        }        
    }

    return (
        <div className="w-full max-w-xs m-auto text-black">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <p className="text-xl mb-4">
                    Welcome, {user.displayName || user.email}
                </p>
        
                <button
                    className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}