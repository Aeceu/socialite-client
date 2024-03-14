import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import UserStore from "../store/UserStore";
import { Spinner } from "@nextui-org/react";

const PersistsLogin = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const { user, token } = UserStore();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    !user || !token ? verifyRefreshToken() : setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className=" flex p-4 items-start justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default PersistsLogin;
