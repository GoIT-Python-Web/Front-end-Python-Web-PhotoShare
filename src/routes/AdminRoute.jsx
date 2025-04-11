import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAdmin, selectIsLoggedIn } from "../store/auth/selectors.js";

export const AdminRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const condition = isLoggedIn && isAdmin;

  return condition ? Component : <Navigate to={redirectTo} />;
};
