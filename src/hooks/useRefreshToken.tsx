import axios from "../api/axios";
import UserStore from "../store/UserStore";

const useRefreshToken = () => {
  const { setToken, setUser } = UserStore();
  const refresh = async () => {
    const res = await axios.get("/refresh", {
      withCredentials: true,
    });

    setUser(res.data.user);
    setToken(res.data.accessToken);

    return res.data;
  };
  return refresh;
};
export default useRefreshToken;
