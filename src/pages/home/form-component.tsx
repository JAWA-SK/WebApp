import { useForm } from 'react-hook-form'
import { DatePickerDemo } from '../../components/ui/datepicker'
import States from '../../constants/states'
import { showToast } from '../../utils/toast'
import { SignUpState } from '../signup/model'
import { FormDetailState } from './model/form-detail-type'
import { Message } from '../../constants/messages'

type UserStateProps = {
    userDetail: SignUpState | null
}
export const FormComponent = ({ userDetail }: UserStateProps) => {
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm({
        defaultValues: {
            email: `${userDetail?.email}`,
            state: '',
            firstName: `${userDetail?.firstName}`,
            lastName: `${userDetail?.lastName}`,
            pincode: 0,
            dob: '',
            country: '',
            service: '',
            address1: '',
            address2: '',
            phoneNo: `${userDetail?.phoneNo}`,
        },
        mode: 'all',
    })
    const submitForm = (data: FormDetailState) => {
        console.log({ data })
        showToast('success', Message.FORM_SUBMITTED)
    }
    return (
        <div className="w-[60%] flex flex-col justify-center ">
            <form
                className="bg-gray-800/70 p-10 rounded-md "
                onSubmit={handleSubmit(submitForm)}
            >
                <div className="flex flex-col text-gray-300  text-lg  gap-5 ">
                    <div className="flex justify-between">
                        <div>
                            <p>First Name:</p>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="first name"
                                className="px-2 py.5 text-black font-normal outline-none rounded-md w-full"
                                {...register('firstName', {
                                    required: {
                                        value: true,
                                        message: 'Missing Last Name',
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            'field must contain at least 1 characters',
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
                        <div>
                            <p>Last Name:</p>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="last name"
                                className="px-2 py.5 text-black font-normal outline-none rounded-md w-full"
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
                        <div>
                            <div>
                                <p>Date Of Birth:</p>
                                <DatePickerDemo></DatePickerDemo>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p>Choose Service:</p>
                            <select
                                id="service"
                                className="text-black font-normal outline-none rounded-md px-2 py-1 w-[14.8rem]"
                                defaultValue={'agriculture'}
                            >
                                <option value={'booking'}>
                                    Water Can Booking
                                </option>
                                <option value={'replacement'}>
                                    Water Can Replacement
                                </option>
                                <option value={'industry'}>
                                    Industry Needs
                                </option>
                                <option value={'agriculture'}>
                                    Agricultural Needs
                                </option>
                            </select>
                        </div>
                        <div>
                            <p>Mobile:</p>
                            <input
                                type="tel"
                                id="mobile"
                                placeholder="mobile"
                                className="px-2 py.5 text-black font-normal outline-none rounded-md w-full"
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
                            {errors.phoneNo && (
                                <>
                                    <p className="text-red-600 text-[16px]">
                                        {errors.phoneNo.message}
                                    </p>
                                </>
                            )}
                        </div>
                        <div>
                            <p>Email:</p>
                            <input
                                type="email"
                                id="email"
                                placeholder="email"
                                className="px-2 py.5 text-black font-normal outline-none rounded-md w-full"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Missing email',
                                    },
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                                        message: 'invalid email address',
                                    },
                                })}
                            ></input>
                            {errors.email && (
                                <>
                                    <p className="text-red-600 text-[16px]">
                                        {errors.email.message}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>{' '}
                    <div className="">
                        <p>Address Line 1:</p>
                        <input
                            type="text"
                            id="address1"
                            placeholder="example door number, street...."
                            className="px-2 py.5 text-black font-normal outline-none rounded-md  w-full"
                            {...register('address1', {
                                required: {
                                    value: true,
                                    message: 'Missing Address',
                                },
                                minLength: {
                                    value: 10,
                                    message:
                                        'field must contain at least 10 characters',
                                },
                            })}
                        ></input>
                        {errors.address1 && (
                            <>
                                <p className="text-red-600 text-[16px]">
                                    {errors.address1.message}
                                </p>
                            </>
                        )}
                    </div>
                    <div className="">
                        <p>Address Line 2:</p>
                        <input
                            type="text"
                            id="address2"
                            placeholder="landmark"
                            className="px-2 py.5 text-black font-normal outline-none rounded-md  w-full"
                        ></input>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p>Country:</p>
                            <select
                                id="country"
                                defaultValue={'IND'}
                                className="px-2 py-1 text-black font-normal outline-none rounded-md w-[15rem]"
                            >
                                <option value={'IND'} disabled>
                                    India
                                </option>
                            </select>
                        </div>
                        <div>
                            <p>State:</p>
                            {<States></States>}
                        </div>
                        <div>
                            <p>Pin Code:</p>
                            <input
                                type="text"
                                id="pincode"
                                placeholder="postal code"
                                className="px-2 py.5 text-black font-normal outline-none rounded-md  w-full"
                                {...register('pincode', {
                                    required: {
                                        value: true,
                                        message: 'Missing Pincode',
                                    },
                                    minLength: {
                                        value: 6,
                                        message:
                                            'field must contain at least 6 characters',
                                    },
                                    maxLength: {
                                        value: 6,
                                        message:
                                            "field mustn't contain more than 6 characters",
                                    },
                                })}
                            ></input>
                            {errors.pincode && (
                                <>
                                    <p className="text-red-600 text-[16px]">
                                        {errors.pincode.message}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>
            <div className="w-full flex justify-center items-center mt-3">
                <button
                    onClick={handleSubmit(submitForm)}
                    className="text-white font-bold text-2xl bg-gray-900/90 px-5 py-2 rounded-md opacity-65 hover:scale-[1.02] transition-all"
                >
                    Submit Form
                </button>
            </div>
        </div>
    )
}
