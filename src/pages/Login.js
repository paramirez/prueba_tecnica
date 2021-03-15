import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Layout } from "antd";
import { app } from "../firebaseConfig.js";
import { Auth } from "../context/AuthContext";
import { LoginForm } from "./components/LoginForm.Component";
import { Signup } from "./components/Signup.Component";

const Login = () => {
  const history = useHistory();
  /* const googleProvider = new firebase.auth.GoogleAuthProvider(); */
  /* const githubProvider = new firebase.auth.GithubAuthProvider(); */

  const { Content, Footer } = Layout;
  const [signup, setSignup] = useState(false);
  const { user } = useContext(Auth);
  const [error, setError] = useState("");
  useEffect(() => {
    if (user) history.push("/");
  }, [history, user]);

  /* const socialLogin = async (provider) => { */
  /*   await app */
  /*     .auth() */
  /*     .signInWithPopup(provider) */
  /*     .then((result) => { */
  /*       console.log(result); */
  /*     }) */
  /*     .catch((err) => setError(err.message)); */
  /* }; */

  const login = async (values) => {
    const { email, password } = values;
    try {
      const result = await app
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(result);
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  /* <Button onClick={() => socialLogin(googleProvider)}>Google</Button> */
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        {!signup ? (
          <LoginForm
            setSignup={setSignup}
            login={login}
            error={error}
          ></LoginForm>
        ) : (
          <Signup setSignup={setSignup} />
        )}
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default Login;
