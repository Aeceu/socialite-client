import { useNavigate } from "react-router-dom";
import UserStore from "../store/UserStore";
import axios from "../api/axios";
import { CustomSuccessToast } from "../components/CustomToast";

export const useUserLogout = () => {
  const { setUser, setToken } = UserStore();
  const navigate = useNavigate();
  const logout = async () => {
    setUser(null);
    setToken(null);

    try {
      const res = await axios.get("/logout", {
        withCredentials: true,
      });
      CustomSuccessToast(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};
