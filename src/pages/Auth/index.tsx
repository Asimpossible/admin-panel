import React from 'react'
import styles from './style.module.scss'
import { useForm, Controller } from 'react-hook-form'
import { Button, Input } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'


const Index: React.FC = () => {

    const [password, setPassword] = React.useState<string>('')
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            firstName: '',
            password: ''
        },

    })

    type TData = {
        firstName: string,
        password: string
    }
    const onSubmit = (data: TData) => {
        console.log(data)
    }
    console.log(errors)


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.formDiv}>
                    <h1 className={styles.formTitle}>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <Controller
                            name='firstName'
                            control={control}
                            render={({ field }) => <Input {...field} type='email' placeholder='Name' className={styles.nameInput} />}

                        />
                        <div className={styles.passwordInputDiv}>

                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Password'
                                        className={styles.passwordInput} />}
                            />
                            <Button className={styles.passwordVisibleButton} onClick={() => toggleShowPassword()}>
                                {showPassword ? <EyeInvisibleOutlined className={styles.passwordVisibleIcon} /> : <EyeOutlined className={styles.passwordVisibleIcon} />}
                            </Button>
                        </div>

                        <button type='submit' className={styles.button}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Index
