import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { showToast } from '../../utils/toast'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Message } from '../../constants/messages'

export const NavBar = () => {
    const { isLoggedIn } = useContext(UserContext)!
    const navigate = useNavigate()
    async function handleLogout() {
        try {
            await auth.signOut()
            showToast('success', Message.LOGGED_OUT)
        } catch (err) {
            console.log({ err })
        }
    }
    return (
        <div className="flex justify-around cursor-pointer text-xl text-gray-300">
            <span className="hover:line-through line-through-black decoration-black ">
                Home
            </span>
            <span className="hover:line-through line-through-black decoration-black  transition:text-decoration 0.3s ease  hover:ease-in hover:transition">
                Products
            </span>
            <span className="hover:line-through line-through-black decoration-black">
                Gallery
            </span>
            <span className="hover:line-through line-through-black decoration-black">
                About
            </span>
            <span className="hover:line-through line-through-black decoration-black">
                Contact
            </span>
            <span className="hover:line-through line-through-black decoration-black">
                Faq
            </span>{' '}
            <span
                className="hover:line-through line-through-black decoration-black"
                onClick={() =>
                    isLoggedIn ? handleLogout() : navigate('/login')
                }
            >
                <span>
                    {isLoggedIn ? (
                        <span className="text-red-500">Log Out</span>
                    ) : (
                        'Log In'
                    )}
                </span>
            </span>
            <span
                className="hover:line-through line-through-black decoration-black"
                onClick={() => navigate('/signup')}
            >
                <span>Sign In</span>
            </span>
        </div>
    )
}
