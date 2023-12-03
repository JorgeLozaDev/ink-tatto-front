import React, { useState } from "react";
import Inputs from "../../common/Input/Input";
import { insertUser, loginUser } from "../../services/apiCalls";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../userSlice";
import "./Register.css";
import CustomPopup from "../../common/CustomPopup/CustomPopup";

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
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState("");

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
          .catch((e) => {
            console.log(e);
            handleServerError(e);
          });
      })
      .catch((e) => {
        console.log(e.response.data);
        handleServerError(e);
      });
    event.preventDefault();
  };

  const handleServerError = (error) => {
    setPopupTitle("Error");
    if (error.response.data.missingFields) {
      setPopupContent(
        error.response.data.message +
          ": " +
          error.response.data.missingFields || "Hubo un error del servidor."
      );
    } else {
      setPopupContent(
        error.response.data.message || "Hubo un error del servidor."
      );
    }
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <Container fluid className="contenido registerDesign">
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

          <p className="text-center">
            <Button type="submit" variant="secondary">
              Enviar
            </Button>
          </p>
        </Form>
      </Container>
      <CustomPopup
        show={showPopup}
        onHide={handleClosePopup}
        title={popupTitle}
        content={popupContent}
      />
    </>
  );
};
