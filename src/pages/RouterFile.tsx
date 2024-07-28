import { RenderIf } from '@/shared/components'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/shared/layout'
import { useAppSelector } from '@/redux/store'

const PrivateRoots = React.lazy(() => import('./privateRoots'))
const Auth = React.lazy(() => import('./Auth'))

const Router: React.FC = () => {
    const { token } = useAppSelector(state => state.user)


    return (
        <>
            <React.Suspense>
                <RenderIf condition={token}>
                    <Layout>
                        <PrivateRoots />
                    </Layout>
                </RenderIf>
            </React.Suspense>

            <React.Suspense>
                <RenderIf condition={!token}>
                    <Routes>
                        <Route element={<Navigate to={'/auth'} />} path="*" />
                        <Route element={<Auth />} path="/auth" />
                    </Routes>
                </RenderIf>
            </React.Suspense>
        </>
    )
}

export default Router
