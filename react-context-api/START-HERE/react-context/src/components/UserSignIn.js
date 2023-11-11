// useContext is a hook that returns the context value
import { useRef, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ThemeContext from '../context/ThemeContext';

const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const { accentColor } = useContext(ThemeContext);

  // State
  const username = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();

  // Event Handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    // using the function provided by the parent
    actions.signIn(username.current.value, password.current.value);
    navigate("/");
  }

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              id="username"
              required
              type="text"
              ref={username}
              placeholder="Username" />
            <input
              id="password"
              required
              type="password"
              ref={password}
              placeholder="Password" />
            <div className="pad-bottom">
              <button className="button" type="submit" style={{ background: accentColor }}>Sign In</button>
              <button className="button button-secondary" style={{ color: accentColor }} onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSignIn;