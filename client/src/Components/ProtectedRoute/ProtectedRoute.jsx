import {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Navigate } from "react-router-dom";
import { 
    getAuth,
    onAuthStateChanged 
  } from "firebase/auth";

import Loading from '../../Components/Loading/Loading' 
import { getUser } from '../../Redux/slices/users/users'
const ProtectedRoute = ({children}) => {

    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const Dispatch = useDispatch();

    useEffect(() => {
      const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
          Dispatch(getUser(currentUser))
      })
      return () => unsubuscribe();
    }, [Dispatch]);

    if (loading) return <Loading/>;
  
    if (!user) return <Navigate to="/" />;
  
    return children;  
} 

export default ProtectedRoute