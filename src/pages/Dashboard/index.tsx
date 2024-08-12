//! zod validate and edit user not completed
import { useDeleteUsersMutation, useGetUsersQuery, usePostUsersMutation } from '@/redux/api/users'
import { Table, Button, Drawer, Input, Modal } from 'antd'
import React from 'react'
import styles from './users.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { ISendUser, IUsers } from '@/redux/api/users/types'
import { DeleteOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { deleteUser, postUser, toggleUserStatus } from '@/redux/features/User'
import { FaUserAlt, FaUserEdit } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { GrStatusGood } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RenderIf } from '@/shared/components'

const Index: React.FC = () => {

    const { data, error, isLoading } = useGetUsersQuery()
    const [postingUser] = usePostUsersMutation()
    const [deleteUserApi] = useDeleteUsersMutation()
    const dispatch = useAppDispatch()
    const usersData = useAppSelector(state => state.users.data) || []
    //For reset current page in on form submit and delete user
    const navigate = useNavigate()

    //Zod Validation for React-Hook-Form
    const schema = z.object({
        firstName: z.string().min(1, { message: 'First Name is required' }).regex(/^\S+$/, "String must not contain spaces"),
        lastName: z.string().min(1, { message: 'Last Name is required' }).regex(/^\S+$/, "String must not contain spaces"),
        email: z.string().email().min(1, { message: 'Email is required' }),
        phone: z.string().regex(/^994\d*$/),
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters long." })  // Minimum length validation
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            ),
        confirmPassword: z.string()
    })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match.",
            path: ["confirmPassword"], // The path to set the error message
        })

    //Post User Form
    const { reset, control, formState: { errors, isSubmitSuccessful }, handleSubmit } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        resolver: zodResolver(schema)
    })

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    const onFormSubmit = (data: ISendUser): void => {

        try {
            postingUser(data).unwrap()
            reset();
        }
        catch (e) {
            console.error('Error occurred in form submission: ', e)
        }
        console.error('Error ocurred in form', errors)
    }

    //Edit user drawer
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState<IUsers | null>(null);

    const showEditDrawer = (user: IUsers) => {
        setCurrentUser(user);
        setDrawerVisible(true);
    };

    const closeEditDrawer = () => {
        setDrawerVisible(false);
        setCurrentUser(null);
    };

    //ANTD Modal
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Password Visibilty Button
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

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
        try {
            await deleteUserApi(id)
            dispatch(deleteUser(id))
            setIsModalOpen(false)
            reset()
            navigate(0)
        }
        catch (error) {
            console.error('Error occurred with delete user', error)
        }
    }

    //ANTD Input Drawer
    const [inputOpen, setInputOpen] = React.useState<boolean>(false);

    const showInputDrawer = () => {
        setInputOpen(true);
    };

    const onInputClose = () => {
        setInputOpen(false);
    };

    //ANTD View Drawer
    const [visible, setVisible] = React.useState<boolean>(false)
    const [drawerContent, setDrawerContent] = React.useState<IUsers | null>(null);
    const showViewDrawer = (record: IUsers) => {
        setDrawerContent(record);
        setVisible(true)
    }
    const onDrawerClose = () => {
        setVisible(false)
        setDrawerContent(null)
    }

    //Get Users Query
    if (error) {
        console.error('Error fetching users ', error)
        return <h2>Error fetching users. Please try again later...</h2>
    }

    if (isLoading) return <h2>Loading users...</h2>

    //ANTD Table
    const dataWithIndex = usersData.map((item, index) => ({
        ...item,
        key: index,
    })) || [];


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
                <Button style={{}} onClick={() => handleButtonClick(record.id)}>
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
                    <button className={styles.viewButton} onClick={() => showViewDrawer(record)}>
                        <EyeOutlined />
                    </button>
                    <Drawer title="Basic Drawer" onClose={onDrawerClose} open={visible} mask={false}>
                        {drawerContent && (

                            <div className={styles.card}>
                                <div className={styles.tools}>
                                    <div className={styles.circle}>
                                        <span className={`${styles.red} ${styles.box}`}></span>
                                    </div>
                                    <div className={styles.circle}>
                                        <span className={`${styles.yellow} ${styles.box}`}></span>
                                    </div>
                                    <div className={styles.circle}>
                                        <span className={`${styles.green} ${styles.box}`}></span>
                                    </div>
                                </div>
                                <div className={styles.card__content}>
                                    <div className={styles.contentDiv}>
                                        <div className={styles.contentIcon}><FaUserAlt /></div>
                                        <div className={styles.contentInnerDiv}>
                                            <div className={styles.content}>
                                                {drawerContent.firstName}
                                            </div>
                                            <div className={styles.contentInner}>First Name</div>
                                        </div>
                                    </div>
                                    <div className={styles.contentDiv}>
                                        <div className={styles.contentIcon}><FaUserAlt /></div>
                                        <div className={styles.contentInnerDiv}>
                                            <div className={styles.content}>
                                                {drawerContent.lastName}
                                            </div>
                                            <div className={styles.contentInner}>Last Name</div>
                                        </div>
                                    </div>
                                    <div className={styles.contentDiv}>
                                        <div className={styles.contentIcon}><MdEmail /></div>
                                        <div className={styles.contentInnerDiv}>
                                            <div className={styles.content}>
                                                {drawerContent.email}
                                            </div>
                                            <div className={styles.contentInner}>Email</div>
                                        </div>
                                    </div>
                                    <div className={styles.contentDiv}>
                                        <div className={styles.contentIcon}><GrStatusGood /></div>
                                        <div className={styles.contentInnerDiv}>
                                            <div className={styles.content}>
                                                {drawerContent.isActive ? 'Active' : 'InActive'}
                                            </div>
                                            <div className={styles.contentInner}>Status</div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        )}
                    </Drawer >

                    {/*Edit Button */}
                    <button className={styles.editButton} onClick={() => showEditDrawer(record)}>
                        <FaUserEdit />
                        <Drawer title="Edit User" mask={false} onClose={closeEditDrawer} open={drawerVisible}>
                            <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
                                <Controller
                                    control={control}
                                    name='firstName'
                                    render={({ field }) => <Input {...field} type='text' value={record.firstName} placeholder='First Name' className={styles.input} />}
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
                    </button>


                    {/* Delete Button*/}
                    < button className={styles.deleteButton} onClick={() => {
                        showModal()
                    }}>
                        <DeleteOutlined />
                    </button >
                    <Modal mask={false} title="Delete" open={isModalOpen} onOk={() => handleDeleteUser(record.id)} onCancel={handleCancel} okText={'Delete'} onClose={handleCancel} centered={true}>
                        <h3>Are you sure to delete?</h3>
                    </Modal>
                </div >
            )
        }

    ];

    return (

        <>
            <div className={styles.dashboardWrapper}>
                <Button onClick={showInputDrawer} style={{ marginBottom: '13px', border: '1px solid black' }}>Create the user</Button>
                <Table pagination={{ defaultPageSize: 8, showSizeChanger: false }}
                    size='middle' dataSource={dataWithIndex} columns={usersColumns} className={styles.table} />
                <Drawer title="Create User" onClose={onInputClose} open={inputOpen}>
                    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
                        <div>
                            <Controller
                                control={control}
                                name='firstName'
                                render={({ field }) => <Input {...field} type='text' placeholder='First Name' className={styles.input} />}
                            />
                            <RenderIf condition={errors.firstName?.message?.length}>
                                <p className={styles.validateError}> {errors.firstName?.message} </p>
                            </RenderIf>
                        </div>
                        <div>
                            <Controller
                                control={control}
                                name='lastName'
                                render={({ field }) => <Input {...field} type='text' placeholder='Last Name' className={styles.input} />}
                            />
                            <RenderIf condition={errors.lastName?.message?.length}>
                                <p className={styles.validateError}> {errors.lastName?.message} </p>
                            </RenderIf>
                        </div>
                        <div>
                            <Controller
                                control={control}
                                name='email'
                                render={({ field }) => <Input {...field} type='email' placeholder='Email' className={styles.input} />}
                            />
                            <RenderIf condition={errors.email?.message?.length}>
                                <p className={styles.validateError}> {errors.email?.message} </p>
                            </RenderIf>
                        </div>
                        <div>
                            <Controller
                                control={control}
                                name='phone'
                                render={({ field }) => <Input {...field} type='number' placeholder='Phone Number' className={styles.input} />}
                            />
                            <RenderIf condition={errors.phone?.message?.length}>
                                <p className={styles.validateError}> {errors.phone?.message} </p>
                            </RenderIf>
                        </div>
                        <div>
                            <div className={styles.passwordInputDiv}>
                                <Controller
                                    control={control}
                                    name='password'
                                    render={({ field }) => <Input {...field} type='text' placeholder='Password' className={styles.input} />}
                                />
                                <Button className={styles.passwordVisibleButton} onClick={() => toggleShowPassword()}>
                                    {showPassword ? <EyeInvisibleOutlined className={styles.passwordVisibleIcon} /> : <EyeOutlined className={styles.passwordVisibleIcon} />}
                                </Button>
                            </div>
                            <RenderIf condition={errors.password?.message?.length}>
                                <p className={styles.validateError}>  {errors.password?.message} </p>
                            </RenderIf>
                        </div>
                        <div>
                            <div className={styles.passwordInputDiv}>
                                <Controller
                                    control={control}
                                    name='confirmPassword'
                                    render={({ field }) => <Input {...field} type='text' placeholder='Confirm Password' className={styles.input} />}
                                />
                                <Button className={styles.passwordVisibleButton} onClick={() => toggleShowPassword()}>
                                    {showPassword ? <EyeInvisibleOutlined className={styles.passwordVisibleIcon} /> : <EyeOutlined className={styles.passwordVisibleIcon} />}
                                </Button>
                            </div>
                            <RenderIf condition={errors.confirmPassword?.message?.length}>
                                <p className={styles.validateError}>  {errors.confirmPassword?.message} </p>
                            </RenderIf>
                        </div>
                        <Button htmlType='submit'>Create user</Button>
                    </form >
                </Drawer >
            </div >
        </>
    )
}

export default Index