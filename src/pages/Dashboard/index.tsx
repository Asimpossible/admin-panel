import { useAppDispatch } from '@/redux/store'
import { revertAll } from '@/shared/constants/models'
import React from 'react'

const Index: React.FC = () => {
    const dispatch = useAppDispatch()
    return (
        <>
            <button onClick={() => dispatch(revertAll())}>Log Out</button>
        </>
    )
}

export default Index
