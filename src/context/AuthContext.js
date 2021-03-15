import React, { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import * as firebaseClient from "../clients/firebase";

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showChild, setShowChild] = useState(false);

  const updateUser = async (data) => {
    const extraData = { ...user._extraData, ...data };
    await firebaseClient.updateUser(user.uid, extraData);
    setUser({ ...user, _extraData: extraData });
  };

  useEffect(() => {
    app.auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userDB = await firebaseClient.getUser(user.uid);
        setUser({ ...user, _extraData: userDB || {} });
      }
      setShowChild(true);
    });
  }, []);

  if (!showChild) return <h1>Cargando</h1>;
  else
    return (
      <Auth.Provider value={{ user, updateUser }}>{children}</Auth.Provider>
    );
};
