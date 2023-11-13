import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

  const signIn = async (credentials) => {
    // encoding user credentials following the basic authentication scheme requirement
    // btoa() creates a base 64 endoded ASCII string from a string of data
    // basic authentication requires the username and password to be separated by a colon :  
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password }`);

    const fecthOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      },
    }


    const response = await fetch("http://localhost:5000/api/users", fecthOptions);
    // console.log(response)
    if (response.status === 200){
      const user = await response.json();
      setAuthUser(user);
      return user
    } else if (response.status === 401){
      return null
    } else {
      throw new Error()
    }

  }

  const signOut = () => {
    setAuthUser(null);
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