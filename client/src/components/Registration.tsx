import React from 'react'
import '../styles/register.css'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface RegistrationProps {
  registration: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void
}

const Registration: React.FC<RegistrationProps> = ({ registration }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: { email: '', password: '', firstName: '', lastName: '' }
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await registration(data.email, data.password, data.firstName, data.lastName)
    reset()
  }

  return (
    <div className='loginContainer'>
      <div className='anotherContainerRegister'></div>
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='registerForm'
      >
        <label htmlFor='firstName'>First Name</label>
        <input
          id='firstName'
          {...register('firstName', { required: 'First name is required' })}
          type='text'
        />
        {errors.firstName && (
          <span role='alert'>{errors.firstName.message}</span>
        )}
        <label htmlFor='lastName'>Last Name</label>
        <input
          id='lastName'
          {...register('lastName', { required: 'Last name is required' })}
          type='text'
        />
        {errors.lastName && <span role='alert'>{errors.lastName.message}</span>}
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format'
            }
          })}
          type='text'
        />
        {errors.email && <span role='alert'>{errors.email.message}</span>}
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          {...register('password', { required: 'Password is required' })}
          type='password'
        />
        {errors.password && <span role='alert'>{errors.password.message}</span>}
        <button
          type='submit'
          className='loginButton'
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Registration
