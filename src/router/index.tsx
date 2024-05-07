import Home from '../pages/home'
import Login from '../pages/login'
import SignUp from '../pages/signup'
import { routerType } from './model/routes.types'

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
