import React, { useState, useContext, useEffect } from "react";
import { Auth } from "./AuthContext";
import * as gapi from "../clients/gapi";

export const Calendar = React.createContext();

export const CalendarContext = ({ children }) => {
  const { user, updateUser } = useContext(Auth);
  const [calendarApiLoaded, setCalendarApiLoaded] = useState(false);
  const [accessCalendar, setAccessCalendar] = useState(false);

  useEffect(() => {
    gapi.loadApi(() => setCalendarApiLoaded(true));
  });

  useEffect(() => {
    if (
      user &&
      user._extraData &&
      user._extraData.calendar &&
      calendarApiLoaded
    ) {
      setAccessCalendar(true);
    }
  }, [user, calendarApiLoaded]);

  const suscribeCalendar = async () => {
    const googleUser = await gapi.login();
    const calendar = googleUser.getAuthResponse().id_token;
    // Quizas sería mejor almacenar la fecha de expiración y validar si se puede o no seguir usando la api
    await updateUser({ calendar });
  };

  const getCalendar = async () => await gapi.getCalendar();

  return (
    <Calendar.Provider
      value={{
        user,
        updateUser,
        getCalendar,
        suscribeCalendar,
        accessCalendar,
      }}
    >
      {calendarApiLoaded ? children : null}
    </Calendar.Provider>
  );
};
