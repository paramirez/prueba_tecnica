import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import { accessToken, getUser } from "../clients/github";

const OAuthGithub = () => {
  const history = useHistory();
  const { user, updateUser } = useContext(Auth);
  useEffect(() => {
    console.log(history.location.search);
    if (!user) history.push("/login");
    const search = history.location.search;
    if (search.includes("error=access_denied")) history.push("/");
    else if (search.includes("code")) {
      const call = async () => {
        const code = search.split("code=")[1];
        const res = await accessToken(code);
        const { access_token } = res.data;
        if (access_token) {
          const { login, url } = await getUser(access_token);
          await updateUser({ github: { token: access_token, login, url } });
        }
        history.push("/");
      };
      call();
    }
  }, [user, history]);
  return <div>redirect</div>;
};

export default OAuthGithub;
