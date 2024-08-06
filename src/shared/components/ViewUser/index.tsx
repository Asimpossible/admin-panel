import React from 'react'
import styles from './viewUser.module.scss'
import { Drawer } from 'antd'
import 'antd/dist/antd.css';


const Dashboard = React.lazy(() => import('@/pages/Dashboard'))

const Index: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const showDrawer = () => {
        setOpen(true)
        console.log('clicked')
    }

    const onClose = () => {
        setOpen(false);
    };

    return (

        <>
            <Dashboard onClick={() => showDrawer()} />
            <Drawer title="User Details" onClose={onClose} open={open}>
                <div className={styles.card}>Hello</div>
            </Drawer>
        </>
    )
}

export default Index
