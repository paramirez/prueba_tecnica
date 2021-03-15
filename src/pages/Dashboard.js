import firebase from "firebase";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import { CalendarContext } from "../context/CalendarContext";
import Calendar from "./Calendar";

const Dashboard = () => {
  const { user } = useContext(Auth);
  const history = useHistory();
  const [el] = useState("calendar");

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
          <h1>Bienvenido {user.name}</h1>
          <button onClick={closeSessión}>Cerrar sesión</button>
          {el === "calendar" ? (
            <CalendarContext>
              <Calendar />
            </CalendarContext>
          ) : null}
        </div>
      ) : (
        "Sin usuarioi"
      )}
    </div>
  );
};

export default Dashboard;
