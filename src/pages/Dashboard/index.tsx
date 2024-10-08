//*edit and delete user completed
//!change status not completed
import { useChangeStatusMutation, useDeleteUsersMutation, useGetUsersQuery } from '@/redux/api/users'
import { Table, Button, Drawer } from 'antd'
import React from 'react'
import styles from './users.module.scss'
import { IUsers } from '@/redux/api/users/types'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/redux/store'
import { deleteUser, toggleUserStatus } from '@/redux/features/User'
import { FaUserAlt, FaUserEdit } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { GrStatusGood } from 'react-icons/gr'
import CreateUser from '@/shared/components/CreateUser'
import EditUser from '@/shared/components/EditUser'
import DeleteModal from '@/shared/components/DeleteUser'

const Index: React.FC = () => {

    const [currentUser, setCurrentUser] = React.useState<IUsers | null>(null);
    const { data, error, isLoading } = useGetUsersQuery()
    const [deleteUserApi] = useDeleteUsersMutation();
    const [changeStatus] = useChangeStatusMutation();
    const dispatch = useAppDispatch()

    //Edit user drawer
    const [drawerVisible, setDrawerVisible] = React.useState(false);

    const showEditDrawer = (user: IUsers) => {
        setCurrentUser(user);
        setDrawerVisible(true);
    };

    const closeEditDrawer = () => {
        setDrawerVisible(false);
        setCurrentUser(null);
    };

    //ANTD Delete Modal
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showDeleteModal = (user: IUsers) => {
        setIsModalOpen(true);
        setCurrentUser(user);
    };

    const handleDeleteCancel = () => {
        setIsModalOpen(false);
        setCurrentUser(null)
    };

    //Change status of user
    const handleChangeStatus = async (user: IUsers) => {
        try {
            await changeStatus({ id: user.id, isActive: !user.isActive }).unwrap();
            dispatch(toggleUserStatus({ id: user.id, isActive: !user.isActive }));
            // Optionally, you can show a success message or refresh the data
            console.log('User status updated successfully');
        } catch (error) {
            console.error('Failed to change status:', error);
            // Optionally, show an error message to the user
        }
    };

    //Function to delete user
    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUserApi(id)
            dispatch(deleteUser(id))
            setIsModalOpen(false)
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
    const dataWithIndex = data?.data.map((item, id) => ({
        ...item,
        key: id,
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
                <Button style={{}} onClick={() => handleChangeStatus(record)}>
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


                    {/* Edit Button */}
                    <button className={styles.editButton} onClick={() => showEditDrawer(record)}>
                        <FaUserEdit />
                    </button>


                    {/* Delete Button*/}
                    < button className={styles.deleteButton} onClick={() => {
                        showDeleteModal(record)
                    }}>
                        <DeleteOutlined />
                    </button >

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
                {/* Create User Drawer */}
                <CreateUser onClose={onInputClose} visible={inputOpen} />

                {/* View Drawer */}
                <Drawer title="View User" onClose={onDrawerClose} open={visible} mask={false}>
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

                {/* Edit User Drawer */}
                <EditUser
                    visible={drawerVisible}
                    onClose={closeEditDrawer}
                    user={currentUser}
                />

                {/* Delete Modal */}
                <DeleteModal
                    visible={isModalOpen}
                    user={currentUser}
                    onDelete={handleDeleteUser}
                    onCancel={handleDeleteCancel}
                />
            </div >
        </>
    )
}

export default Index