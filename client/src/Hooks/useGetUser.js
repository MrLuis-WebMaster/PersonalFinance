import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { getUser,resetUser } from "../Redux/slices/users/users";

const useUser = () => {
  const Dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector((state) => state.users.infoUser.userInfo);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        Dispatch(getUser(currentUser));
      } else {
        Dispatch(resetUser());
      }
    });
    return () => {
      Dispatch(resetUser());
    };
  }, [Dispatch]);

  return user;
};

export default useUser;
