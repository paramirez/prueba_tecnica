import { Form, Button, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Error from "../../components/Error.Component";

export const LoginForm = ({ setSignup, login, error, children }) => {
  return (
    <Form className="login-form" onFinish={login}>
      <Form.Item>
        <h1>Ingreso</h1>
      </Form.Item>
      {error ? <Error message={error} /> : null}
      <Form.Item
        name="email"
        rules={[
          { type: "email", message: "Email no valido" },
          { required: true, message: "Email requerido" },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          name="Correo electrónico"
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
        <Button htmlType="submit">Iniciar sesión</Button>
        <Button onClick={() => setSignup(true)} type="link">
          Registrarse Ahora!
        </Button>
      </Form.Item>
      {children}
    </Form>
  );
};
