import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Drawer, Input } from 'antd';
import { ISendUser } from '@/redux/api/users/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RenderIf } from '@/shared/components';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { usePostUsersMutation } from '@/redux/api/users';
import styles from './CreateUser.module.scss'

const CreateUser: React.FC<{ onClose: () => void; visible: boolean }> = ({ onClose, visible }) => {
    const [postingUser] = usePostUsersMutation();

    // Zod Validation for React-Hook-Form
    const schema = z.object({
        firstName: z.string().min(1, { message: 'First Name is required' }).regex(/^(?!\s+$).*/, "String must not contain spaces"),
        lastName: z.string().min(1, { message: 'Last Name is required' }).regex(/^(?!\s+$).*/, "String must not contain spaces"),
        email: z.string().email().min(1, { message: 'Email is required' }),
        phone: z.string(),
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters long." })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

    const { reset, control, formState: { errors, isSubmitSuccessful }, handleSubmit, setValue } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '994',
            password: '',
            confirmPassword: ''
        },
        resolver: zodResolver(schema),
    });

    React.useEffect(() => {
        if (!visible) {
            reset();
        }
    }, [visible, reset]);

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            onClose(); // Close drawer after successful submission
        }
    }, [isSubmitSuccessful, reset, onClose]);

    const onFormSubmit = async (data: ISendUser) => {
        await postingUser(data).unwrap();
    };

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);


    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
        let { value } = e.target;
        if (!value.startsWith('994')) {
            value = '994' + value.replace(/[^0-9]/g, '');
        }
        onChange(value); // Update the value in React Hook Form
        setValue('phone', value); // Update the phone field in React Hook Form
    };

    return (
        <Drawer title="Create User" onClose={onClose} open={visible}>
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
                            <Input
                                {...field}
                                placeholder='Phone Number'
                                onChange={(e) => handlePhoneChange(e, field.onChange)}
                                className={styles.input}
                            />
                        }
                    />
                    <RenderIf condition={errors.phone?.message?.length}>
                        <p className={styles.validateError}>{errors.phone?.message}</p>
                    </RenderIf>
                </div>
                <div>
                    <div>
                        <Controller
                            control={control}
                            name='password'
                            render={({ field }) => <Input {...field} type={showPassword ? 'text' : 'password'} placeholder='Password' className={styles.input} />}

                        />
                        <Button onClick={toggleShowPassword}>
                            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </Button>
                    </div>
                    <RenderIf condition={errors.password?.message?.length}>
                        <p className={styles.validateError}>{errors.password?.message}</p>
                    </RenderIf>
                </div>
                <div>
                    <div>
                        <Controller
                            control={control}
                            name='confirmPassword'
                            render={({ field }) => <Input {...field} type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' className={styles.input} />}
                        />
                        <Button onClick={toggleShowConfirmPassword}>
                            {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </Button>
                    </div>
                    <RenderIf condition={errors.confirmPassword?.message?.length}>
                        <p className={styles.validateError}>{errors.confirmPassword?.message}</p>
                    </RenderIf>
                </div>
                <Button htmlType='submit'>Create user</Button>
            </form>
        </Drawer>
    );
};

export default CreateUser;
