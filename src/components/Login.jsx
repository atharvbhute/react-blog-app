import React, {useState, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button , Input, Logo } from './index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth_service'
import { login as authLogin} from '../store/authSlice'

function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.loginUser(data);
      if (session) {
        authService.getCurrentUser()
        .then((userData) => {
          dispatch(authLogin(userData))
          navigate('/');
        })
        .catch((err) => setError(err?.message));      
      }
    } catch (err) {
      setError(err)      
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
          login to your account
        </h2>
        <p>
          Don&apos;t have any account?&nbsp;
          <Link
            to={"/signup"}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Signup
          </Link>
        </p>
        {error && <p className='text-red-600 my-6 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <Input type="email" placeholder="Enter your email" label="Email : "
          {...register("email",{
            required: true,
            validate: {
              matchPatern: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || "Enter valid Email"
            }
          })}/>
          <Input type="password" placeholder="Enter your password" label="Password : "
          {...register("password",{required : true})}/>

          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login