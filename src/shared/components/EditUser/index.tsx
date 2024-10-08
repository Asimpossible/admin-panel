import React from 'react';
import { Button, Drawer, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { ISendUser, IUsers } from '@/redux/api/users/types';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateUserMutation } from '@/redux/api/users';
import RenderIf from '../RenderIf';
import styles from './editUser.module.scss'

interface EditUserProps {
    visible: boolean;
    onClose: () => void;
    user: IUsers | null;
}

const EditUser: React.FC<EditUserProps> = ({ visible, onClose, user }) => {
    const [updateUser] = useUpdateUserMutation();

    const schema = z.object({
        firstName: z.string().min(1, { message: 'First Name is required' }).regex(/^(?!\s+$).*/, "String must not contain spaces"),
        lastName: z.string().min(1, { message: 'Last Name is required' }).regex(/^(?!\s+$).*/, "String must not contain spaces"),
        email: z.string().email().min(1, { message: 'Email is required' }),
        phone: z.string()
    })

    const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '994',
            password: '',
            confirmPassword: '',
        },
        resolver: zodResolver(schema),
    });

    React.useEffect(() => {
        if (visible && user) {
            reset({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                phone: user?.phone || '',
                password: '',
                confirmPassword: '',
            });
        }
    }, [visible, user, reset]);

    const onFormSubmit = async (data: ISendUser): Promise<void> => {
        if (user) {
            const updateData = {
                id: user.id,
                email: data.email,
                phone: data.phone,
                firstName: data.firstName,
                lastName: data.lastName,
            };
            try {
                await updateUser(updateData)
                reset();
                onClose();

            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
        else {
            console.error('User data is null or undefined.');
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
        let { value } = e.target;
        if (!value.startsWith('994')) {
            value = '994' + value.replace(/[^0-9]/g, '');
        }
        onChange(value); // Update the value in React Hook Form
        setValue('phone', value); // Update the phone field in React Hook Form
    };

    return (
        <Drawer title="Edit User" open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
                <div>
                    <Controller
                        control={control}
                        name='firstName'
                        render={({ field }) => <Input {...field} placeholder='First Name' className={styles.input} />}
                    />
                    <RenderIf condition={errors.firstName?.message?.length}>
                        <p className={styles.validateError}>{errors.firstName?.message}</p>
                    </RenderIf>
                </div>
                <div>
                    <Controller
                        control={control}
                        name='lastName'
                        render={({ field }) => <Input {...field} placeholder='Last Name' className={styles.input} />}
                    />
                    <RenderIf condition={errors.lastName?.message?.length}>
                        <p className={styles.validateError}>{errors.lastName?.message}</p>
                    </RenderIf>
                </div>
                <div>
                    <Controller
                        control={control}
                        name='email'
                        render={({ field }) => <Input {...field} type='email' placeholder='Email'
                            className={styles.input} />}
                    />
                    <RenderIf condition={errors.email?.message?.length}>
                        <p className={styles.validateError}>{errors.email?.message}</p>
                    </RenderIf>
                </div>
                <div>
                    <Controller
                        control={control}
                        name='phone'
                        render={({ field }) =>
                            <Input {...field}
                                placeholder='Phone Number'
                                onChange={(e) => handlePhoneChange(e, field.onChange)}
                                className={styles.input} />}
                    />
                    <RenderIf condition={errors.phone?.message?.length}>
                        <p className={styles.validateError}>{errors.phone?.message}</p>
                    </RenderIf>
                </div>
                <Button htmlType='submit'>Edit user</Button>
            </form>
        </Drawer>
    );
};

export default EditUser;