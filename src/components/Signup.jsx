import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import authService from '../appwrite/auth_service'
import { useForm } from 'react-hook-form'
import { Button , Input, Logo } from './index'


function Signup() {

    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signUp = async(data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser();
                dispatch(login(userData));
                navigate('/');                
            }
        } catch (err) {
            setError(err);                        
        }
    }
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span>
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Signup to your account
        </h2>
        <p>
          already have an account?&nbsp;
          <Link
            to={"/login"}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login here
          </Link>
        </p>
        {error && <p className='text-red-600 my-6 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(signUp)}>
          <Input placeholder="Enter username" label="Username :" 
          {...register("username", {
            required: true
          })}/>

          <Input type="email" placeholder="Enter your email" label="Email : "
          {...register("email",{
            required: true,
            validate: {
              matchPatern: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || "Enter valid Email"
            }
          })}/>

          <Input type="password" placeholder="Enter your password" label="Password : "
          {...register("password",{required : true})}/>

          <Button type="submit" className="w-full">Signup</Button>
        </form>
      </div>
    </div>
  )
}

export default Signup