import { createContext, useState } from "react";

// This simply creates Context and allows it to be used within the app
const UserContext = createContext(null);

// Creating a provider as a function. Exporting it so other files can access it
export const UserProvider = (props) => {
    // Moved user state here and is no longer a responsibility of App.js
    const [user, setUser] = useState(null);

    const signInUser = (username, password) => {
        const newUser = {
          username,
          password
        };
        setUser(newUser);
      }
    
      const signOutUser = () => {
        setUser(null);
      }

    return (
        <UserContext.Provider value={ {
            user,
            //  to pass a function down through context, add actions and reference a function
            actions: {
              signIn: signInUser,
              signOut: signOutUser
            }
          } }>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;