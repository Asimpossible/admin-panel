import React from 'react'
import { Button, Input, Table } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useGetPartnerQuery, usePostPartnerMutation } from '@/redux/api/partner';
import { resetWarned } from 'antd/es/_util/warning';

const Index: React.FC = () => {

    const { data, error, isLoading } = useGetPartnerQuery();
    const [postPartner] = usePostPartnerMutation();

    //React Hook Form

    const { reset, control, formState: { errors, isSubmitSuccessful }, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            contactFirstName: '',
            contactLastName: '',
            phoneNum: 0,
            email: '',
            city: {
                chooseCity: '',
                address: '',
                latitude: '',
                langitude: ''
            }
        }
    })

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])


    type TPartnerData = {
        name: string
        contactFirstName: string
        contactLastName: string
        phoneNum: number
        email: string
    }


    const onFromSubmit = (data: TPartnerData): void => {
        postPartner(data)
        try { () => { resetWarned() } }
        catch (e) {
            console.log(e)
        }
    }
    console.log(errors)



    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading data</div>
    }

    const columns = [{
        title: 'Partner Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Contact Person Fullname',
        dataIndex: 'contactPerson',
        key: 'contactPerson'
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    }
    ]

    const dataWithKeys = data?.data.map((item, index) => ({
        ...item,
        key: index
    }))




    return (
        <>
            <Table
                dataSource={dataWithKeys}
                columns={columns}
            />
            <form onSubmit={handleSubmit(onFromSubmit)}>
                <Controller
                    name='name'
                    control={control}
                    render={({ field }) =>
                        <Input {...field} type='text' placeholder='Partner Name' />}
                />
                <Controller
                    name='contactFirstName'
                    control={control}
                    render={({ field }) =>
                        <Input {...field} type='text' placeholder='Contact Person Firstname' />}
                />
                <Controller
                    name='contactLastName'
                    control={control}
                    render={({ field }) =>
                        <Input {...field} type='text' placeholder='Contact Person Lastname' />}
                />
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) =>
                        <Input {...field} type='email' placeholder='Email' />}
                />
                <Controller
                    name='phoneNum'
                    control={control}
                    render={({ field }) =>
                        <Input {...field} type='number' placeholder='Phone Number' />}
                />
                <Button htmlType='submit'>Submit</Button>
            </form>
        </>
    )
}

export default Index
