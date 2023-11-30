import { Button } from "react-bootstrap";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="home">
        <div>
          <h1>Bienvenido a Ink Masters</h1>
          <Button onClick={()=>{navigate("/login")}}>Inicia sesión o registrate</Button>
        </div>
      </div>
    </>
  );
};
