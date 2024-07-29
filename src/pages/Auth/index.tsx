import React from 'react'
import styles from './style.module.scss'
import { useForm, Controller } from 'react-hook-form'
import { Button, Input } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useLoginUserMutation } from '@/redux/api/auth'
import { resetWarned } from 'antd/es/_util/warning'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Index: React.FC = () => {
    const [postData] = useLoginUserMutation()

    //Toastify
    const onError = () => {
        toast.error('There are errors in the form. Please fix them and try again.');
        console.log(errors)
    };

    // Password Visibilty Button
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    //React Hook Form
    const { reset, control, formState: { errors, isSubmitSuccessful }, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: ''
        },

    })
    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    type TData = {
        username: string,
        password: string
    }
    const onSubmit = (data: TData) => {
        postData(data)
        try { () => { resetWarned() } }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.formDiv}>
                    <h1 className={styles.formTitle}>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
                        <Controller
                            name='username'
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
                                        placeholder='Password'
                                        className={styles.passwordInput} />}
                            />
                            <Button className={styles.passwordVisibleButton} onClick={() => toggleShowPassword()}>
                                {showPassword ? <EyeInvisibleOutlined className={styles.passwordVisibleIcon} /> : <EyeOutlined className={styles.passwordVisibleIcon} />}
                            </Button>
                        </div>

                        <button type='submit' className={styles.button}>Submit</button>
                    </form>
                    <ToastContainer className={styles.toast} />
                </div>
            </div>
        </>
    )
}

export default Index
