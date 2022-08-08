import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
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
export const resetPassword = (email) => sendPasswordResetEmail(auth,email)
