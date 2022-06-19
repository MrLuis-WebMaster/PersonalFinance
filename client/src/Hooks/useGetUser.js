import {useSelector, useDispatch} from 'react-redux';
import { getAuth} from "firebase/auth";
import { getUser } from '../Redux/slices/users/users'

const useUser = () => {
    const Dispatch = useDispatch();
    const auth = getAuth();

    const user = useSelector(state => state.users.infoUser.userInfo)
    Dispatch(getUser(auth.currentUser))

    return user;
}

export default useUser;