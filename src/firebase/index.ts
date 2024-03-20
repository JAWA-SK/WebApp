import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth/cordova'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {
    DataSnapshot,
    child,
    get,
    getDatabase,
    ref,
    set,
} from 'firebase/database'
import { SignUpState } from '../pages/signup/model'
import { showToast } from '../utils/toast'

const firebaseConfig = {
    apiKey: 'AIzaSyDvFhJ1SAKZGjMFqaxE4nu1KXetAjUIrng',
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
}

const app = firebase.initializeApp(firebaseConfig)
export const provider = new GoogleAuthProvider()
export const auth = app.auth()
export const authApp = getAuth(app)

export function writeUserData(data: SignUpState) {
    console.log({ data })
    const db = getDatabase()
    set(ref(db, `users/` + data.email.split('@')[0]), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        phoneNo: data.phoneNo,
        password: data.password,
    })
}

export function forGotPassword(email: string) {
    const auth = getAuth()
    sendPasswordResetEmail(auth, email)
        .then(() => {
            showToast('info', 'Check Your Inbox')
        })
        .catch((err) => {
            console.log({ err })
            console.log({ email })

            showToast('error', 'Unexpected Error')
        })
}

export async function getUserData(email: string): Promise<SignUpState | null> {
    const dbRef = ref(getDatabase())

    try {
        const snapshot: DataSnapshot = await get(child(dbRef, `users/${email}`))

        if (snapshot.exists()) {
            const data: SignUpState = snapshot.val()
            return data
        } else {
            console.log('No data available')
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

// export function signInWithGoogle() {
//   console.log("jwlk");
//   const auth = getAuth();
//   getRedirectResult(auth)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access Google APIs.
//       const credential = GoogleAuthProvider.credentialFromResult(result!);
//       const token = credential?.accessToken;

//       // The signed-in user info.
//       const user = result?.user;
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       console.log(error);

//     });
// }

export default app
