import {useEffect,useState} from 'react';
import { Navigate } from "react-router-dom";
import {  getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../../Components/Loading/Loading' 

const ProtectedRoute = ({children}) => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubuscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser);
          setLoading(false);
      })
      return () => unsubuscribe();
    }, []);

    if (loading) return <Loading/>;
  
    if (!user) return <Navigate to="/" />;
  
    return children;  
} 

export default ProtectedRoute