import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth.accessToken) {
      verifyRefreshToken();
    } else {
      if (isMounted) {
        setIsLoading(false);
      }
    }
    return () => (isMounted = false);
  });

  return <>{!persist ? <Outlet /> : isLoading ? <p>Loading</p> : <Outlet />}</>;
}

export default PersistLogin;
