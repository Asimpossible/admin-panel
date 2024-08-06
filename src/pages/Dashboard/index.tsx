//! view drawer, delete user don't working
import { useDeleteUsersMutation, useGetUsersQuery, usePostUsersMutation } from '@/redux/api/users'
import { Table, Button, Drawer, Input, Modal } from 'antd'
import React from 'react'
import styles from './users.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { resetWarned } from 'antd/es/_util/warning'
import { ISendUser, IUsers } from '@/redux/api/users/types'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { deleteUser, postUser, toggleUserStatus } from '@/redux/features/User'

interface ViewDrawerProps {
    onClick: () => void;
}

const Index: React.FC<ViewDrawerProps> = ({ onClick }) => {

    const { data, error, isLoading } = useGetUsersQuery()
    const [postingUser] = usePostUsersMutation()
    const [deleteUserApi] = useDeleteUsersMutation()
    const dispatch = useAppDispatch()
    const usersData = useAppSelector(state => state.users.data) || []

    //ANTD Modal
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //Change status of user
    React.useEffect(() => {
        if (data?.data) {
            dispatch(postUser(data?.data))
        }
    }, [data, dispatch]);

    // Function to handle status change
    const handleButtonClick = (id: number) => {
        dispatch(toggleUserStatus(id))
    };

    //Function to delete user
    const handleDeleteUser = async (id: number) => {
        await deleteUserApi(id)
        dispatch(deleteUser(id))
        setIsModalOpen(false)
    }

    //ANTD Input Drawer
    const [inputOpen, setInputOpen] = React.useState<boolean>(false);

    const showInputDrawer = () => {
        setInputOpen(true);
    };

    const oninputClose = () => {
        setInputOpen(false);
    };

    //React Hook Form
    const { reset, control, formState: { errors, isSubmitSuccessful }, handleSubmit } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
    })

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    const onFormSubmit = (data: ISendUser): void => {
        postingUser(data)
        try { () => { resetWarned() } }
        catch (e) {
            console.log(e)
        }
        console.error('Error ocurred in form', errors)
    }

    //Get Users Query
    if (error) {
        console.error('Error fetching users ', error)
        return <h2>Error fetching users</h2>
    }

    if (isLoading) return <h2>Loading...</h2>

    //ANTD Table
    const dataWithIndex = usersData.map((item, index) => ({
        ...item,
        key: index,
    }));


    const usersColumns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_: unknown, record: IUsers) => (
                <Button onClick={() => handleButtonClick(record.id)}>
                    {record.isActive ? 'Active' : 'Inactive'}
                </Button>
            )
        },
        {
            title: 'Tools',
            dataIndex: 'tools',
            key: 'tools',
            render: (_: unknown, record: IUsers) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    {/* View Button*/}
                    <button className={styles.viewButton} onClick={onClick}>
                        <EyeOutlined />
                    </button>

                    {/* Delete Button*/}
                    <button className={styles.deleteButton} onClick={() => {
                        showModal()
                    }}>
                        <DeleteOutlined />
                    </button>
                    <Modal mask={false} title="Delete" open={isModalOpen} onOk={() => handleDeleteUser(record.id)} onCancel={handleCancel} okText={'Delete'} onClose={handleCancel} centered={true}>
                        <h3>Are you sure to delete?</h3>
                    </Modal>
                </div>
            )
        }

    ];

    return (

        <>
            <div className={styles.dashboardWrapper}>
                <Button onClick={showInputDrawer} style={{ marginBottom: '13px', border: '1px solid black' }}>Open the Drawer</Button>
                <Table pagination={{ defaultPageSize: 8, showSizeChanger: false }}
                    size='middle' dataSource={dataWithIndex} columns={usersColumns} className={styles.table} />
                <Drawer title="Create User" onClose={oninputClose} open={inputOpen}>
                    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
                        <Controller
                            control={control}
                            name='firstName'
                            render={({ field }) => <Input {...field} type='text' placeholder='First Name' className={styles.input} />}
                        />

                        <Controller
                            control={control}
                            name='lastName'
                            render={({ field }) => <Input {...field} type='text' placeholder='Last Name' className={styles.input} />}
                        />

                        <Controller
                            control={control}
                            name='email'
                            render={({ field }) => <Input {...field} type='email' placeholder='Email' className={styles.input} />}
                        />

                        <Controller
                            control={control}
                            name='phone'
                            render={({ field }) => <Input {...field} type='number' placeholder='Phone Number' className={styles.input} />}
                        />

                        <Controller
                            control={control}
                            name='password'
                            render={({ field }) => <Input {...field} type='text' placeholder='Password' className={styles.input} />}
                        />

                        <Controller
                            control={control}
                            name='confirmPassword'
                            render={({ field }) => <Input {...field} type='text' placeholder='Confirm Password' className={styles.input} />}
                        />

                        <Button htmlType='submit'>Create user</Button>
                    </form >
                </Drawer >
            </div >
        </>
    )
}

export default Index