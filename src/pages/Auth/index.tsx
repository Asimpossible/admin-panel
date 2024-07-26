import React from 'react'
import styles from './style.module.scss'
import { useForm, Controller } from 'react-hook-form'
import { Input } from 'antd'

const Index: React.FC = () => {

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
                            render={({ field }) => <Input {...field} type='email' placeholder='Name' className={styles.input} />}

                        />

                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => <Input {...field} type='password' placeholder='Password' className={styles.input} />}
                        />

                        <button type='submit' className={styles.button}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Index
