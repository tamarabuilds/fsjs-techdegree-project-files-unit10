import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);

    if (authUser) {
        return <Outlet />
    } else {
        return <Navigate to="/signin" />
    }
    
    // Could also use ternary operator but if else is good for readability
    // return authUser ? <Outlet /> : <Navigate to='/signin' />;

};

export default PrivateRoute;