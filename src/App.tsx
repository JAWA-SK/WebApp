import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserContextProvider from './context/UserContext'
import { Router } from './router/router'
function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <ToastContainer />
                <Router />
            </BrowserRouter>
        </UserContextProvider>
    )
}

export default App
