import { RenderIf } from '@/shared/components'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/shared/layout'

const PrivateRoots = React.lazy(() => import('./privateRoots'))
const Auth = React.lazy(() => import('./Auth'))

const Router: React.FC = () => {
    const FAKE_AUTH = false


    return (
        <>
            <React.Suspense>
                <RenderIf condition={FAKE_AUTH}>
                    <Layout>
                        <PrivateRoots />
                    </Layout>
                </RenderIf>
            </React.Suspense>

            <React.Suspense>
                <RenderIf condition={!FAKE_AUTH}>
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
