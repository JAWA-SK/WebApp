import { Route, Routes } from 'react-router-dom'
import { pages } from '.'
import { routerType } from './routes.types'

export const Router = () => {
    const pageRoutes = pages.map(({ path, title, element }: routerType) => {
        return <Route key={title} path={`/${path}`} element={element} />
    })
    return <Routes>{pageRoutes}</Routes>
}
