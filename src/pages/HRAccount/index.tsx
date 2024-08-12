import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { RenderIf } from '@/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const Index: React.FC = () => {

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

    //Create HR Account Form
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


    const [inputOpen, setInputOpen] = React.useState<boolean>(false);

    const showInputDrawer = () => {
        setInputOpen(true);
    };

    const onInputClose = () => {
        setInputOpen(false);
    };

    return (
        <>
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
        </>
    )
}

export default Index
