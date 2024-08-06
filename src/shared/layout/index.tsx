import React, { useState } from 'react';
import styles from './layout.module.scss'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { revertAll } from '../constants/models';
import { useAppDispatch } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import { FaUserShield, FaUserCog, FaUsers, FaHandshake } from "react-icons/fa";


interface IProps {
    children: React.ReactNode
}

const App: React.FC<IProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return (
        <Layout style={{ width: '100vw', height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Users',
                            onClick: () => { navigate('/dashboard') }
                        },
                        {
                            key: '2',
                            icon: <FaUserShield />,
                            label: 'Assets',
                            onClick: () => { navigate('/usermanagement') }
                        },
                        {
                            key: '3',
                            icon: <FaUserCog />,
                            label: 'HR Account',
                            onClick: () => { navigate('/hraccount') }
                        },
                        {
                            key: '4',
                            icon: <FaUsers />,
                            label: 'Employee',
                            onClick: () => { navigate('/employee') }
                        },
                        {
                            key: '5',
                            icon: <FaHandshake />,
                            label: 'Partners',
                            onClick: () => { navigate('/partner') }
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: "space-between", alignItems: "center", paddingRight: " 20px" }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <button className={styles.Btn} onClick={() => dispatch(revertAll())}>
                        <div className={styles.sign}><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                        <div className={styles.text}>Logout</div>
                    </button>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        // minHeight: 280,
                        height: '100%',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout >
    );
};

export default App;