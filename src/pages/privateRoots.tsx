import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Dashboard = React.lazy(() => import('@/pages/Dashboard'))
const UserManagement = React.lazy(() => import('@/pages/UserManagement'))

const PrivateRoots: React.FC = () => {

    return (
        <>
            <Routes>
                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<Navigate to={'/dashboard'} />} path="*" />
                <Route element={<UserManagement />} path="/userManagement" />
            </Routes>
        </>
    )
}

export default PrivateRoots