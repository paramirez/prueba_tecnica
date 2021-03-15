import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";

const Error = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Página no encontrada"
      extra={<Button onClick={() => history.push("/")}>Volver</Button>}
    />
  );
};

export default Error;
