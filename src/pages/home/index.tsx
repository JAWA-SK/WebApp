import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from '../../components/ui/model'
import { UserContext } from '../../context/UserContext'
import { auth, getUserData } from '../../firebase'
import { SignUpState } from '../signup/model'
import { FormComponent } from './form-component'
import { NavBar } from './navbar'
import { TextComponent } from './text-component'
import { Message } from '../../constants/messages'
import { showToast } from '../../utils/toast'
import { Loader } from './loader'

function Home() {
    const [userData, setUserData] = useState<SignUpState | null>(null)
    const { saveUser, userDetail, setIsLoggedIn, isLoggedIn } =
        useContext(UserContext)!
    const user = useLocation().state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData: SignUpState | null = await getUserData(
                    user?.user.email.split('@')[0]
                )

                setUserData(userData)
                saveUser(userData!)
                auth.onAuthStateChanged((userCred) => {
                    userCred ? setIsLoggedIn(true) : setIsLoggedIn(false)
                })
            } catch (error) {
                console.log({ error })
                showToast('info', Message.GOT_AN_ACCOUNT)
            }
        }
        fetchData()
    })
    if (!userDetail) {
        return <Loader></Loader>
    }
    return (
        <>
            <div
                className="w-full flex flex-col h-screen font-primary p-3 "
                style={{
                    backgroundImage:
                        'url(src/assets/background-image/mountain.jpg)',
                    backgroundSize: 'cover',
                }}
            >
                {isLoggedIn && (
                    <>
                        {' '}
                        <Modal
                            firstName={userData?.firstName}
                            lastName={userData?.lastName}
                        />
                    </>
                )}
                <NavBar></NavBar>
                <div className="flex h-full w-full ">
                    <TextComponent></TextComponent>
                    <FormComponent userDetail={userDetail}></FormComponent>
                </div>
            </div>
        </>
    )
}

export default Home
