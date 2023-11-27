import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Inputs from "../../common/Input/Input";

export const CreateMettings = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    if (token.credentials.length == 0) {
      navigate("/");
    }
  }, []);

  const inputHandler = (value, name) => {
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlerLogin = (event) => {
    // loginUser("user/login", logindata)
    //   .then((dat) => {
    //     dispatch(login({ credentials: dat.data.token }));
    //     navigate("/profile");
    //   })
    //   .catch((e) => console.log(e));
    console.log(dataForm);
    event.preventDefault();
  };
  return (
    <>
      <Container>
        <Form onSubmit={handlerLogin} method="post">
        <Inputs
            placeholder={"Fecha naciemiento"}
            type={"date"}
            max={new Date()}
            name={"mettingStart"}
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
