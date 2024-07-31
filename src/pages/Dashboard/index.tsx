import { useGetUsersQuery, usePostUsersMutation } from '@/redux/api/users'
import { ISendUser } from '@/redux/api/users/types'
import { Table, Button, Drawer, Input, Form } from 'antd'
import React from 'react'
import styles from './users.module.scss'
import { Controller, useForm } from 'react-hook-form'

const Index: React.FC = () => {
    const { error, isLoading, data } = useGetUsersQuery()
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
    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            phoneNum: '',
            password: '',
            confirmPassword: ''
        }
    })
    console.error("Error ocurred with form", errors)


    const onFromSubmit = (data: ISendUser) => {
        postUser(data)
    }

    //Get Users Query
    if (error) {
        console.error('Error fetching users: ', error)
        return <h2>Error fetching users</h2>
    }

    if (isLoading) return <h2>Loading...</h2>

    //ANTD Table
    const dataWithIndex = data?.data?.map((item, index) => ({
        ...item,
        key: index,

    }))

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
            key: 'phoneNum',
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'status',
        },
    ];


    return (

        <>
            <div className={styles.dashboardWrapper}>
                <Button onClick={showDrawer}>Open the Drawer</Button>
                <Table dataSource={dataWithIndex} columns={usersColumns} className={styles.table} />
                <Drawer title="Create User" onClose={onClose} open={open}>
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={handleSubmit(onFromSubmit)}
                        className={styles.form}>

                        <Form.Item label='First Name'>
                            <Controller
                                name='firstname'
                                control={control}
                                render={({ field }) =>

                                    <Input {...field} type='text' placeholder='First Name' className={styles.input} />

                                }
                            />
                        </Form.Item>

                        <Controller
                            name='lastname'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} type='text' placeholder='Last Name' className={styles.input} />
                            }
                        />
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} type='email' placeholder='E-mail' className={styles.input} />
                            }
                        />
                        <Controller
                            name='phoneNum'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} type='number' placeholder='Phone Number' className={styles.input} />
                            }
                        />
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} type='string' placeholder='Password' className={styles.input} />
                            }
                        />
                        <Controller
                            name='confirmPassword'
                            control={control}
                            render={({ field }) =>
                                <Input {...field} type='string' placeholder='Confirm Password' className={styles.input} />
                            }
                        />
                    </Form>
                </Drawer>



            </div >
        </>
    )
}

export default Index
