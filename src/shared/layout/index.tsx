import React, { useState } from 'react';
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
                    <Button onClick={() => dispatch(revertAll())}>Log Out</Button>

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
        </Layout>
    );
};

export default App;