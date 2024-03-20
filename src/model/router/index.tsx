import { routerType } from './routes.types'
import Login from '../../pages/login'
import SignUp from '../../pages/signup'
import Home from '../../pages/home'

export const pages: routerType[] = [
    {
        path: '/',
        title: 'home',
        element: <Home />,
    },
    {
        path: '/signup',
        title: 'signup',
        element: <SignUp />,
    },
    {
        path: '/login',
        title: 'login',
        element: <Login />,
    },
]
