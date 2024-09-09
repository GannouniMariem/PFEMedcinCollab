import React from 'react'
import pagesRouteDate from './routerConfig'
import { Route, Routes } from 'react-router-dom'
import AuthGuard from "./protectedRoute"
import { Layout } from '../layout/Layout'
const Router = () => {
    const pageRoutes = pagesRouteDate.map(({path,title,component, auth})=>{
        return <Route key={title} path={path} element={
            <AuthGuard auth={auth}>
                <Layout auth={auth}>
                   {component}
                </Layout>
            </AuthGuard>
        }/>
    })
  return (
        <Routes>
            {pageRoutes}
        </Routes>
    )
}

export default Router