import { SignUpState } from '../../signup/model'

export type LoginState = {
    email: string
    password: string
}
export type UserData = {
    data: SignUpState | null
    isAccessible: boolean
}
