import Lottie from 'lottie-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiLoaderCircle } from 'react-icons/bi'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import lock from '../../assets/login-images/lock.json'
import login_animation from '../../assets/login-images/login_animation.json'
import { auth, forGotPassword } from '../../firebase'
import { showToast } from '../../utils/toast'
import { LoginState } from './model'
import man_drinking_water from '../../assets/login-images/man_drinking_water.png'
import { UserContext } from '../../context/UserContext'
import { ErrorMessage, Message } from '../../constants/messages'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [access, setAccess] = useState(true)
    const [showPassword, setShowPassword] = useState(true)
    const [term, setTerm] = useState(false)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const { setIsLoggedIn, isEmailVerified, setIsEmailVerified } =
        useContext(UserContext)!
    const {
        formState: { errors },
        handleSubmit,
        register,
        watch,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'all',
    })

    useEffect(() => {
        setEmail(watch('email'))
    }, [watch])

    // useEffect(() => {
    //     auth.onAuthStateChanged((userCred) => {
    //         setIsEmailVerified(userCred?.emailVerified)
    //         console.log(userCred?.emailVerified)
    //     })
    // })

    const loginUser = async (data: LoginState) => {
        setIsLoading(true)
        const email = data.email
        const password = data.password
        setTimeout(async () => {
            setIsLoading(false)
            try {
                const user = await auth.signInWithEmailAndPassword(
                    email,
                    password
                )
                if (user.user?.emailVerified) {
                    setIsEmailVerified(true)
                }
                isEmailVerified
                    ? (showToast('success', Message.LOGIN_SUCCESSFUL),
                      navigate('/', { state: { user: data } }),
                      setIsLoggedIn(true))
                    : showToast('info', Message.VERIFY_EMAIL)
            } catch (err) {
                setAccess(false)
                showToast('error', ErrorMessage.INCORRECT_MESSAGE)
                console.log({ err })
            }
        }, 500)
    }

    return (
        <>
            <div
                className="bg-blue-800 w-full h-screen  items-center justify-center flex font-primary"
                style={{
                    backgroundImage:
                        'url(src/assets/background-image/mountain.jpg)',
                    backgroundSize: 'cover',
                }}
            >
                <form
                    className="flex bg-blue-100 w-[50%]  relative rounded-md justify-start p-5 select-none"
                    onSubmit={handleSubmit(loginUser)}
                >
                    <div className="flex-col w-[60%] text-gray-700 relative">
                        <span className="font-bold text-[30px] underline flex justify-center">
                            Login
                        </span>

                        <div className="flex flex-col text-[20px] gap-2 justify-center mt-5 ">
                            <span>Email:</span>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    id="email"
                                    className={`bg-gray-100 outline-none w-full border-none rounded-md px-2 py-1 ${
                                        errors.email
                                            ? '  outline outline-red-500'
                                            : ''
                                    }`}
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: 'Missing email',
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'invalid email address',
                                        },
                                    })}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                                <Lottie
                                    animationData={login_animation}
                                    className="h-14 absolute right-0 -top-2"
                                    loop={!access ? 1 : 0}
                                ></Lottie>
                            </div>
                        </div>
                        <div className="flex flex-col  relative text-[20px] gap-2 justify-center mt-5">
                            <span>
                                Password:
                                <div className="absolute left-[5.3rem] top-[.5rem] ">
                                    {!showPassword ? (
                                        <FaRegEyeSlash
                                            className="w-full h-4 cursor-pointer"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    ) : (
                                        <FaRegEye
                                            className="w-full h-4   cursor-pointer"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    )}
                                </div>
                            </span>
                            <div className="relative">
                                <input
                                    type={!showPassword ? 'password' : 'text'}
                                    placeholder="Enter Password"
                                    id="password"
                                    autoComplete="off"
                                    className={`bg-gray-100 w-full outline-none border-none rounded-md px-2 py-1 ${
                                        errors.password
                                            ? 'outline outline-red-500 '
                                            : ''
                                    }`}
                                    {...register('password', {
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                            message: 'Enter a valid password',
                                        },
                                        required: {
                                            value: true,
                                            message: 'Missing password',
                                        },
                                    })}
                                ></input>

                                {
                                    <Lottie
                                        animationData={lock}
                                        className=" h-[8rem] absolute -right-[0rem] -top-[4.9rem]"
                                        loop={!access ? 1 : 0}
                                    ></Lottie>
                                }
                                <div className="flex gap-1 mt-1">
                                    <input
                                        id="termsAndCondition"
                                        type="checkbox"
                                        className="accent-black"
                                        onClick={() => setTerm(!term)}
                                    ></input>
                                    <div className="flex justify-between cursor-pointer w-full">
                                        <label
                                            className="text-sm cursor-pointer"
                                            htmlFor="termsAndCondition"
                                        >
                                            Accept terms and condition
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <span
                                            className="text-sm cursor-pointer hover:text-blue-700"
                                            onClick={() =>
                                                forGotPassword(email)
                                            }
                                        >
                                            Forgot Password?
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className=" bg-blue-800 w-full p-3 text-[20px] gap-2 mt-7 rounded-md font-bold text-gray-200 hover:scale-x-[1.02] transition-all"
                                disabled={term ? false : true}
                                onClick={() => {
                                    handleSubmit(loginUser)
                                }}
                            >
                                <span className="flex justify-center">
                                    {' '}
                                    {!isLoading ? (
                                        'Login'
                                    ) : (
                                        <BiLoaderCircle className="animate-spin h-7" />
                                    )}
                                </span>
                            </button>
                        </div>
                        <span className="text-gray-500 font-light">
                            Don't have account?{' '}
                            <span
                                className="cursor-pointer text-gray-800 hover:text-red-500"
                                onClick={() => navigate('/signup')}
                            >
                                SignUp
                            </span>
                            <span className="text-black"> (Or) </span>
                            <span className="cursor-pointer text-gray-800 hover:text-red-500">
                                <span>Sign in with Google</span>
                            </span>
                        </span>
                    </div>
                </form>
                <div className="flex flex-col justify-end max-w-full absolute right-[22rem] top-[1rem]">
                    <img
                        src={man_drinking_water}
                        className="max-w-full  h-auto"
                    ></img>
                </div>
            </div>
        </>
    )
}

export default Login
