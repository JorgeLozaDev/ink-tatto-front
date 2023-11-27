import React, { useState } from "react";
import Inputs from "../../common/Input/Input";
import { insertUser, loginUser } from "../../services/apiCalls";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../userSlice";

export const Register = () => {
  const [logindata, setLoginData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
    birthday: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = (value, name) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlerSend = (event) => {
    insertUser("user/singup", logindata)
      .then((date) => {
        loginUser("user/login", logindata)
          .then((dat) => {
            dispatch(login({ credentials: dat.data.token }));
            navigate("/profile");
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e.response.data));
    event.preventDefault();
  };
  return (
    <>
      <Container>
        <Form onSubmit={handlerSend} method="post">
          <Inputs
            placeholder={"Nombre"}
            type={"text"}
            name={"name"}
            handler={inputHandler}
          />

          <Inputs
            placeholder={"Apellidos"}
            type={"text"}
            name={"lastname"}
            handler={inputHandler}
          />
          <Inputs
            placeholder={"Email"}
            type={"email"}
            name={"email"}
            handler={inputHandler}
          />
          <Inputs
            placeholder={"password"}
            type={"password"}
            name={"password"}
            handler={inputHandler}
          />
          <Inputs
            placeholder={"Nombre de usuario"}
            type={"text"}
            name={"username"}
            handler={inputHandler}
          />
          <Inputs
            placeholder={"Fecha naciemiento"}
            type={"date"}
            name={"birthday"}
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
