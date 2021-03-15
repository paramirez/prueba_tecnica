import React, { useState, useContext, useEffect } from "react";
import { Auth } from "./AuthContext";

export const Github = React.createContext();

export const GithubContext = ({ children }) => {
  const { user, updateUser } = useContext(Auth);
  const [github, setGithub] = useState({});

  const haveGithub = !!(user && user._extraData && user._extraData.github);

  useEffect(() => {
    if (haveGithub) setGithub(user._extraData.github);
  }, [user]);

  const updateGithub = async (data) => {
    await updateUser({ github: { ...github, ...data } });
  };

  const setRepoFav = async (id, add = true) => {
    console.log(id, haveGithub, github);
    if (add) {
      if (haveGithub && !github.favoritos)
        await updateGithub({ favoritos: [id] });
      else if (haveGithub && github.favoritos)
        await updateGithub({ favoritos: github.favoritos.concat(id) });
    } else if (haveGithub && github.favoritos) {
      await updateGithub({
        favoritos: github.favoritos.filter((e) => e.id !== id),
      });
    }
  };

  return (
    <Github.Provider value={{ user, github, setRepoFav }}>
      {children}
    </Github.Provider>
  );
};
