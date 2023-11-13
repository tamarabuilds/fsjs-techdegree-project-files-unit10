import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ErrorsDisplay from './ErrorsDisplay';
import ThemeContext from '../context/ThemeContext';
import UserContext from '../context/UserContext';

const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const { accentColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  // State
  const name = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // event handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name: name.current.value,
      username: username.current.value,
      password: password.current.value 
    };

    // Defining options to pass to the fectch method
    const fetchOptions = {
      // To add new user, method is POST
      method: "POST",
      // In case HTTP server needs it, we're defining the body type via a content type request header...
      headers: {
        // which lets the server know the body type is json with character encoding utf-8
        "Content-Type": "application/json; charset=utf-8"
      },
      // send user's info in the body property and ensure it's a string object with JSON.stringify()
      body: JSON.stringify(user),
    };

    // to catch errors when using async/await, we need a try/catch block
    try {
      const response = await fetch("http://localhost:5000/api/users", fetchOptions);
      if (response.status === 201){
        console.log(`${user.username} is successfully signed up and authenticated!`);
        // passing in user credentials, as need by the signIn function
        await actions.signIn(user);
        navigate('/authenticated');
      } else if (response.status === 400){
        // if not successful, we need to parse the results. We need to do that with response.json(), which returns a promise.
        // Add await to the front to wait for the promise to be fulfilled
        const data = await response.json();
        // console.log(data)
        setErrors(data.errors)
      } else {
        throw new Error();
      }
    } catch (error) {
      // If there's an error, log the error and navigate to the error route
      console.log(error);
      // need React Router's useNavigate() hook to naviagate to a new route
      navigate("/error");
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    // navigate back to the root if the user clicks 'cancel'
    navigate('/')
  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign up</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              ref={name}
              placeholder="Name" />
            <input
              id="username"
              name="username"
              type="text"
              ref={username}
              placeholder="User Name" />
            <input
              id="password"
              name="password"
              type="password"
              ref={password}
              placeholder="Password" />
            <div className="pad-bottom">
              <button className="button" type="submit" style={{ background: accentColor }}>Sign up</button>
              <button className="button button-secondary" style={{ color: accentColor }} onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
        <p>
          Already have a user account? <Link style={{ color: accentColor }} to="/signin">Click here</Link> to sign in!
        </p>
      </div>
    </div>
  );
}

export default UserSignIn;