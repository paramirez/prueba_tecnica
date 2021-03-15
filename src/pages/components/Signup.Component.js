import { useState } from "react";
import { Form, Input, Button } from "antd";
import { app } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Error from "../../components/Error.Component";

export const Signup = ({ setSignup }) => {
  const [error, setError] = useState("");
  const history = useHistory();

  /**
   * @param {MouseEvent} e
   */
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const res = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = await app
        .database()
        .ref("users/" + res.user.uid)
        .set({
          email: res.user.email,
        });
      console.log(user);
      history.push("/");
    } catch (err) {
      console.log(err);

      setError(err.message);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remenber: true }}
      onFinish={onFinish}
    >
      <Form.Item>
        <h1>Registro</h1>
      </Form.Item>
      {error ? (
        <Form.Item>
          <Error message={error} />
        </Form.Item>
      ) : null}
      <Form.Item
        name="email"
        rules={[
          { type: "email", message: "No es un email valido!" },
          { required: true, message: "Emial es requerido!" },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Correo electrónico"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Ingrese una contraseña" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Registrate
        </Button>
        {" O "}
        <Button onClick={() => setSignup(false)} type="link">
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
};
