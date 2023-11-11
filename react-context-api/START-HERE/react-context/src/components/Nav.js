import { Link } from "react-router-dom";
// useContext is a hook that returns the context value
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Nav = () => {
  // Creating a variable to store the context that we want to subscribe to
  const { user } = useContext(UserContext);
  return (
    // <UserContext.Consumer>     // Old code replaced by the useContext hook
    //   {/* To render anything inside the consumer, we need a render prop, meaning it 
    //   takes a function and returns a React element. A function is required and takes
    //   the current context as a parameter and returns JSX.
    //   Context = value prop of the provider
    //   The consumer is now subscribed to any context changes.
    //   */}
    //   {context => {
    //     return (
          <nav>
            {
              user ? (
                <>
                  <Link to="/settings">Settings</Link>
                  <Link to="/signout">Sign Out</Link>
                </>
              ) : (
                <Link className="signin" to="/signin">Sign In</Link>
              )
            }
          </nav>

      //   );
      // }}
    // </UserContext.Consumer>
  );
}

export default Nav;