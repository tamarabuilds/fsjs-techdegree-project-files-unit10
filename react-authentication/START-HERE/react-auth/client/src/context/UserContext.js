import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get('authenticatedUser');
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);


  const signIn = async (credentials) => {
    // encoding user credentials following the basic authentication scheme requirement
    // btoa() creates a base 64 endoded ASCII string from a string of data
    // basic authentication requires the username and password to be separated by a colon :  
    


    const response = await api('/users', 'GET', null, credentials);
    // console.log(response)
    if (response.status === 200){
      const user = await response.json();
      setAuthUser(user);
      // storing cookie name: "authenticatedUser", value of user stringidied, expires in 1 day
      Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
      return user
    } else if (response.status === 401){
      return null
    } else {
      throw new Error()
    }

  }

  const signOut = () => {
    setAuthUser(null);
    Cookies.remove('authenticatedUser');
  }

  return (
    <UserContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;