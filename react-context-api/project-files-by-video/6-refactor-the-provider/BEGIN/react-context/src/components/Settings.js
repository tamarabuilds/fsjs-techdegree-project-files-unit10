import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

//Components
import DarkMode from "./themes/DarkMode";
import AccentColor from "./themes/AccentColor";
import FontSize from "./themes/FontSize";

function Settings(props) {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  // If the user isn't logged in navigate them to signin route
  useEffect(() => {
    if (user === null) {
      navigate('/signin', { replace: true });
    }
  })

  return (
    <div className="bounds">
      <div className="grid-100">
        <h1>Preferences</h1>
        <DarkMode
          isDarkMode={props.isDarkMode}
          toggleDarkMode={props.toggleDarkMode} />
        <AccentColor
          accentColor={props.accentColor}
          updateAccentColor={props.updateAccentColor} />
        <FontSize
          accentColor={props.accentColor}
          fontPercentage={props.fontPercentage}
          updateFontPercentage={props.updateFontPercentage} />
      </div>
    </div>
  );
}

export default Settings;