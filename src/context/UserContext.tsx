import React, { useState } from 'react'
import { SignUpState } from '../pages/signup/model'

export type UserDetailState = {
    userDetail: SignUpState
    saveUser: (user: SignUpState) => void
    isLoggedIn: boolean
    setIsLoggedIn: (value: boolean) => void
    isEmailVerified: boolean | undefined
    setIsEmailVerified: (value: boolean | undefined) => void
}

export const UserContext = React.createContext<UserDetailState | null>(null)

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [userDetail, setUserDetail] = React.useState<SignUpState>({
        email: '',
        firstName: '',
        gender: '',
        lastName: '',
        password: '',
        phoneNo: '',
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isEmailVerified, setIsEmailVerified] = useState<boolean | undefined>(
        false
    )
    const saveUser = (user: SignUpState) => {
        const newUserDetail: SignUpState = {
            email: user.email,
            firstName: user.firstName,
            gender: user.gender,
            lastName: user.lastName,
            password: user.password,
            phoneNo: user.phoneNo,
        }
        setUserDetail(newUserDetail)
    }

    return (
        <UserContext.Provider
            value={{
                userDetail,
                saveUser,
                isLoggedIn,
                setIsLoggedIn,
                setIsEmailVerified,
                isEmailVerified,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
