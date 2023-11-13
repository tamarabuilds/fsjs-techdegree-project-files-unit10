import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);
    const location = useLocation();
    // console.log(location);

    if (authUser) {
        return <Outlet />
    } else {
        // can save the location of where the user tried to navigate to in the state property
        return <Navigate to="/signin" state={{from: location.pathname}}/>
    }

    // Could also use ternary operator but if else is good for readability
    // return authUser ? <Outlet /> : <Navigate to='/signin' />;

};

export default PrivateRoute;