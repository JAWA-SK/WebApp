import Lottie from 'lottie-react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiLoaderCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import lock from '../../assets/login-images/lock.json'
import login_animation from '../../assets/login-images/login_animation.json'
import phone from '../../assets/login-images/phone.json'
import { UserContext, UserDetailState } from '../../context/UserContext'
import { auth } from '../../firebase'
import { showToast } from '../../utils/toast'
import { SignUpState } from './model'
import { writeUserData } from '../../firebase'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Message } from '../../constants/messages'
const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { setIsEmailVerified } = useContext(UserContext)!
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            gender: 'male',
            phoneNo: '',
            isLoggedIn: false,
        },
        mode: 'all',
    })
    const { saveUser } = React.useContext(UserContext) as UserDetailState
    const navigate = useNavigate()
    const signUpUser = (data: SignUpState) => {
        setIsLoading(true)
        setTimeout(async () => {
            setIsLoading(false)
            try {
                saveUser(data)
                setIsEmailVerified(false)
                await auth.createUserWithEmailAndPassword(
                    data.email,
                    data.password
                )
                await auth.currentUser?.sendEmailVerification()
                writeUserData(data as SignUpState)
            } catch (error) {
                console.log({ error })
            }
            showToast('success', Message.VERIFY_BEFORE_LOGIN)
            navigate('/login')
        }, 3000)
    }
    return (
        <div
            className="bg-blue-800 w-full h-screen items-center justify-center flex font-primary"
            style={{
                backgroundImage:
                    'url(src/assets/background-image/mountain.jpg)',
                backgroundSize: 'cover',
            }}
        >
            <form
                className="flex bg-blue-100 w-[70%]  rounded-lg  flex-wrap  p-5 select-none"
                onSubmit={handleSubmit(signUpUser)}
            >
                <div className="flex-col w-full text-gray-700 relative">
                    <span className="font-bold text-[30px] underline flex justify-center">
                        Sign Up
                    </span>
                    <div className="flex flex-col text-[20px] gap-2 justify-center mt-5  ">
                        <div className="flex justify-between">
                            <div>
                                <span>First Name:</span>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter First Name"
                                        id="firstName"
                                        className="bg-gray-100 outline-none min-w-[20rem] border-none rounded-md px-2 py-1"
                                        {...register('firstName', {
                                            required: {
                                                value: true,
                                                message: 'Missing First Name',
                                            },
                                            minLength: {
                                                value: 3,
                                                message:
                                                    'field must contain at least 3 characters',
                                            },
                                        })}
                                    ></input>
                                    {errors.firstName && (
                                        <>
                                            <p className="text-red-600 text-[16px]">
                                                {errors.firstName.message}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <span>Last Name:</span>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        id="lastName"
                                        className="bg-gray-100 outline-none min-w-[20rem] border-none rounded-md px-2 py-1"
                                        {...register('lastName', {
                                            required: {
                                                value: true,
                                                message: 'Missing Last Name',
                                            },
                                            minLength: {
                                                value: 1,
                                                message:
                                                    'field must contain at least 1 characters',
                                            },
                                        })}
                                    ></input>
                                    {errors.lastName && (
                                        <>
                                            <p className="text-red-600 text-[16px]">
                                                {errors.lastName.message}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                <span>Gender:</span>
                                <div className="relative">
                                    <select
                                        id="gender"
                                        className="bg-gray-100 outline-none min-w-[20rem] border-none rounded-md px-2 py-1 cursor-pointer"
                                        {...register('gender', {
                                            required: {
                                                value: true,
                                                message: 'Missing Gender',
                                            },
                                            minLength: {
                                                value: 3,
                                                message:
                                                    'field must contain at least 3 characters',
                                            },
                                        })}
                                    >
                                        <option value={'male'}>Male</option>
                                        <option value={'female'}>Female</option>
                                        <option value={'null'}>
                                            Prefer not to say
                                        </option>
                                    </select>
                                    {errors.gender && (
                                        <>
                                            <p className="text-red-600 text-[16px]">
                                                {errors.gender.message}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between ">
                            <div>
                                <span>Email:</span>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        id="email"
                                        className="bg-gray-100 outline-none min-w-[20rem] border-none rounded-md px-2 py-1"
                                        {...register('email', {
                                            required: {
                                                value: true,
                                                message: 'Missing email',
                                            },
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    'invalid email address',
                                            },
                                        })}
                                    ></input>
                                    <Lottie
                                        animationData={login_animation}
                                        className="h-14 absolute right-0 -top-2"
                                        loop={false}
                                    ></Lottie>
                                    {errors.email && (
                                        <>
                                            <p className="text-red-600 text-[16px]">
                                                {errors.email.message}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <span className="relative">
                                    Password:
                                    {!showPassword ? (
                                        <FaRegEyeSlash
                                            className="w-full h-4 absolute -right-[3.2rem] top-[.2rem] cursor-pointer"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    ) : (
                                        <FaRegEye
                                            className="w-full h-4 absolute -right-[3.2rem] top-[.2rem] cursor-pointer"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    )}
                                </span>
                                <div className="relative">
                                    <input
                                        type={
                                            !showPassword ? 'password' : 'text'
                                        }
                                        placeholder="Enter Password"
                                        id="password"
                                        className="bg-gray-100  outline-none min-w-[20rem] border-none rounded-md px-2 py-1 "
                                        {...register('password', {
                                            pattern: {
                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                                message:
                                                    'Enter a valid password',
                                            },
                                            required: {
                                                value: true,
                                                message: 'Missing password',
                                            },
                                        })}
                                    ></input>
                                    <Lottie
                                        animationData={lock}
                                        className="h-36 absolute -right-[0.3rem] -top-[5.7rem]"
                                        loop={false}
                                    ></Lottie>
                                    {errors.password && (
                                        <>
                                            <p className="text-red-600 text-[16px]">
                                                {errors.password.message}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                <span>Phone no:</span>
                                <div className="relative">
                                    <input
                                        type="phoneNo"
                                        placeholder="Enter Phone Number"
                                        id="phoneNo"
                                        className="bg-gray-100 outline-none min-w-[20rem] border-none rounded-md px-2 py-1"
                                        {...register('phoneNo', {
                                            required: {
                                                value: true,
                                                message: 'Missing phone number',
                                            },
                                            minLength: {
                                                value: 9,
                                                message:
                                                    'phone number cannot be less than 10 digits',
                                            },
                                        })}
                                    ></input>
                                    <Lottie
                                        animationData={phone}
                                        className="h-12 absolute right-0 -top-1"
                                        loop={false}
                                    ></Lottie>
                                    {errors.phoneNo && (
                                        <>
                                            <p className="text-red-600 text-[16px]">
                                                {errors.phoneNo.message}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <button
                            className=" bg-blue-800 min-w-[20rem]  p-3 text-[20px] gap-2 mt-7 rounded-md font-bold text-gray-200 hover:scale-x-[1.02]  transition-all"
                            onClick={() => {
                                handleSubmit(signUpUser)
                            }}
                        >
                            <span className="flex justify-center">
                                {' '}
                                {!isLoading ? (
                                    'Sign Up'
                                ) : (
                                    <BiLoaderCircle className="animate-spin h-7" />
                                )}
                            </span>
                        </button>
                    </div>
                    <span className="text-gray-500 font-thin flex justify-center">
                        Already have an account?{' '}
                        <span
                            className="cursor-pointer text-gray-800  hover:text-red-500"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </span>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default SignUp
