import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AuthRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return <div className="grid place-items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return user ? children : null;
};

export default AuthRoute;