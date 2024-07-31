import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Dashboard = React.lazy(() => import('@/pages/Dashboard'))
const AssetsPage = React.lazy(() => import('@/pages/AssetsPage'))
const HRAccount = React.lazy(() => import('@/pages/HRAccount'))
const Employee = React.lazy(() => import('@/pages/Employee'))
const Partners = React.lazy(() => import('@/pages/Partners'))

const PrivateRoots: React.FC = () => {

    return (
        <>
            <Routes>
                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<Navigate to={'/dashboard'} />} path="*" />
                <Route element={<AssetsPage />} path="/usermanagement" />
                <Route element={<HRAccount />} path='/hraccount' />
                <Route element={<Employee />} path='/employee' />
                <Route element={<Partners />} path='/partner' />
            </Routes>
        </>
    )
}

export default PrivateRoots