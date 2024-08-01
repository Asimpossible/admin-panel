import { useGetUsersQuery, usePostUsersMutation } from '@/redux/api/users'
import { Table, Button, Drawer, Input } from 'antd'
import React from 'react'
import styles from './users.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { resetWarned } from 'antd/es/_util/warning'
import { ISendUser } from '@/redux/api/users/types'

const Index: React.FC = () => {
    const { data, error, isLoading } = useGetUsersQuery()
    const [postUser] = usePostUsersMutation()

    //ANTD Drawer
    const [open, setOpen] = React.useState(false);

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
    const dataWithIndex = Array.isArray(data?.data) ? data?.data.map((item, index) => ({
        ...item,
        key: index,
    })) : [];


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
    ];

    return (

        <>
            <div className={styles.dashboardWrapper}>
                <Button onClick={showDrawer}>Open the Drawer</Button>
                <Table dataSource={dataWithIndex} columns={usersColumns} className={styles.table} />
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
