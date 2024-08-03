//! Status of users created but persist now working in status...

import { useGetUsersQuery, usePostUsersMutation } from '@/redux/api/users'
import { Table, Button, Drawer, Input } from 'antd'
import React from 'react'
import styles from './users.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { resetWarned } from 'antd/es/_util/warning'
import { ISendUser, IUsers } from '@/redux/api/users/types'
import { DeleteOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/redux/store'

const Index: React.FC = () => {
    const { data, error, isLoading } = useGetUsersQuery()
    const [postUser] = usePostUsersMutation()
    const data2 = useAppSelector(state => state.users.data)
    console.log('Current users data: ', data2)


    //Change status of user
    const [usersData, setUsersData] = React.useState<IUsers[]>([]);
    React.useEffect(() => {
        if (data?.data) {
            console.log("1. Data fetched from API: ", data.data); // Log fetched data
            setUsersData(data.data);
        }
    }, [data]);

    React.useEffect(() => {
        console.log("2. usersData state after setting from API data: ", usersData); // Log usersData state
    }, [usersData]);

    // Function to handle status change
    const handleButtonClick = (id: number) => {
        console.log("3. ID received by handleButtonClick: ", id); // Log the ID received
        console.log("4. usersData before map operation: ", usersData); // Log usersData before map

        const updated = usersData.map(user => {
            console.log("5. Current user in map function: ", user); // Log each user object in map
            console.log("6. Current user.id: ", user.id); // Log user.id in map
            if (user.id === id) {
                return { ...user, isActive: !user.isActive };
            }
            return user;
        });

        console.log("7. usersData after map operation: ", updated); // Log updated usersData
        setUsersData(updated);
    };

    //ANTD Drawer
    const [open, setOpen] = React.useState<boolean>(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
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
        postUser(data)
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
            render: () => (
                <Button>
                    <DeleteOutlined />
                </Button >
            )
        }

    ];

    return (

        <>
            <div className={styles.dashboardWrapper}>
                <Button onClick={showDrawer}>Open the Drawer</Button>
                <Table size='middle' dataSource={dataWithIndex} columns={usersColumns} className={styles.table} />
                <Drawer title="Create User" onClose={onClose} open={open}>
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
