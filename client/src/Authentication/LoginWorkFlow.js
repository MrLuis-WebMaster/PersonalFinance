import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

const auth = getAuth();

export const SignUp = (email,password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const LoginUser = (email,password)  => {
  return signInWithEmailAndPassword(auth,email,password)
}

export const LogoutSession = () => signOut(auth);

export const LoginWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

export const resetPassword = (email) => sendPasswordResetEmail(auth,email)
