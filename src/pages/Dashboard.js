import firebase from "firebase";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Divider } from "antd";
import { Auth } from "../context/AuthContext";
import { CalendarContext } from "../context/CalendarContext";
import Calendar from "./Calendar";
import { GithubContext } from "../context/GithubContext";
import Github from "./Github";

const Dashboard = () => {
  const { user } = useContext(Auth);
  const history = useHistory();
  const [el, setEl] = useState(false);

  const closeSessión = async () => {
    await firebase.auth().signOut();
  };

  useEffect(() => {
    if (!user) history.push("/login");
  }, [user, history]);

  return (
    <div>
      {user ? (
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ margin: 0, padding: 0 }}>Bienvenido {user.name}</h1>
            <Divider type="vertical" />
            <button onClick={closeSessión}>Cerrar sesión</button>
          </div>
          <br />
          <button onClick={() => setEl(!el)}>
            {el ? "Github" : "Google Calendar"}
          </button>
          {el ? (
            <CalendarContext>
              <Calendar />
            </CalendarContext>
          ) : (
            <GithubContext>
              <Github />
            </GithubContext>
          )}
        </div>
      ) : (
        "Sin usuarioi"
      )}
    </div>
  );
};

export default Dashboard;
