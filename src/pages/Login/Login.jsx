import React, { useEffect, useState } from "react";
import Inputs from "../../common/Input/Input";
import { loginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const token = useSelector(userDetails);
  const dispatch = useDispatch();

  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (value, name) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (token.credentials != "") {
      navigate("/profile");
    }
  }, []);

  useEffect(() => {
    // console.log(logindata);
  }, [logindata]);

  const handlerLogin = (event) => {
    loginUser("user/login", logindata)
      .then((dat) => {
        dispatch(login({ credentials: dat.data.token }));
        navigate("/profile");
      })
      .catch((e) => console.log(e));
    event.preventDefault();
  };
  return (
    <>
      <Container>
        <Form onSubmit={handlerLogin} method="post">
          <Inputs
            placeholder={"Email"}
            type={"email"}
            name={"email"}
            handler={inputHandler}
          />
          <Inputs
            placeholder={"Contraseña"}
            type={"password"}
            name={"password"}
            handler={inputHandler}
          />
          <Button type="submit" variant="primary">
            Enviar
          </Button>
        </Form>
      </Container>
    </>
  );
};
