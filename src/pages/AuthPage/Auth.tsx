import React, { SyntheticEvent, useEffect, useState } from 'react';

//Router
import { useNavigate } from 'react-router';

//Form
import { useForm } from 'react-hook-form'

//Components
import { Typography , Button } from '@material-ui/core';
import Field from '../../components/Field';
import SpinnerLoad from '../../components/SpinnerLoad';

//Style
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

//Store
import { AuthStore } from '../../store/auth/auth';

//Hooks
import { useLocaleStorage } from '../../hooks/useLocalStorage';
import { useTitle } from '../../hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      height: '100vh'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
        gap: theme.spacing(2)
    }
  }),
);

const Auth = () => {

    const { rename } = useTitle()
    const navigate = useNavigate()
    const [authStore] = useState(AuthStore)
    const { get } = useLocaleStorage("token")
    const [loaded, setLoaded] = useState<boolean>(true)
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        setValue
    } = useForm()
    const classes = useStyles();

    const onChangeHandler = (ev: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(ev.currentTarget.name, ev.currentTarget.value)
    }

    const onSubmitHandler = async (data: Record<string, string>) => {
        setLoaded(false)

        await authStore.login(data)
        if (authStore.redirect) {
            navigate(`/`)
        }

        setLoaded(true)
    }

    const showEmailError = () => {
        switch(errors.email && errors.email.type) {
            case 'minLength':
                return 'Введите больше 1 символа'
            case 'maxLength':
                return 'Введите меньше 50 символов'
            case 'required':
                return 'Поле обязательно'
            default:
                return null
        }
    }

    const showPasswordError = () => {
        switch(errors.password && errors.password.type) {
            case 'minLength':
                return 'Введите больше 1 символа'
            case 'maxLength':
                return 'Введите меньше 50 символов'
            case 'required':
                return 'Поле обязательно'
            default:
                return null
        }
    }

    useEffect(() => {
      rename('Вход')
      if(get()) {
        navigate('/')
      }
    }, [])

    return (
        <div className={classes.root}>
            <form 
                className={classes.form} 
                onSubmit={handleSubmit(onSubmitHandler)}
                noValidate autoComplete="off"
            >
                <Field
                    label="Email"
                    { ...register('email', { required: true, maxLength: 50 }) }
                    onChange={onChangeHandler}
                />
                {
                    errors.email && (
                        <Typography color='secondary'>{showEmailError()}</Typography>
                    )
                }
                <Field
                    label="Пароль" 
                    { ...register('password', { required: true, maxLength: 50 }) }
                    onChange={onChangeHandler}
                />
                {
                    errors.password && (
                        <Typography color='secondary'>{showPasswordError()}</Typography>
                    )
                }
                <Button variant="contained" color="primary" type='submit'>
                    {!loaded ? <SpinnerLoad/> : "Войти"}
                </Button>
            </form>
        </div>
    );
};

export default Auth;



