import React, { useEffect, useState } from "react";
import { profileUser, updateProfile } from "../../services/apiCalls";
import { Form, Button, Container } from "react-bootstrap";
import Inputs from "../../common/Input/Input";
import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import "./Profile.css";

export const Profile = () => {
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(false);

  const token = useSelector(userDetails);

  useEffect(() => {
    profileUser("user/profile", token.credentials)
      .then((e) => {
        setUserData(e.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleEditar = (e) => {
    setEdit(!edit);

    e.target.innerHTML = edit ? "editar" : "cancelar";
  };

  const formattedDate = userData.birthday
    ? new Date(userData.birthday).toISOString().split("T")[0]
    : "";

  const handleChange = (value, name) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlerSubmit = (event) => {
    updateProfile("user/updateProfile", token, userData)
      .then((dat) => {
        console.log("entro");
      })
      .catch((e) => console.log(e.response));
    event.preventDefault();
  };

  return (
    <>
      <Container fluid className="contenido dataProfile">
        {edit ? (
          <Form onSubmit={handlerSubmit} method="post">
            <Inputs
              placeholder={"Email"}
              type={"email"}
              name={"email"}
              value={userData.email}
              handler={handleChange}
              disabled={true}
            />
            <Inputs
              placeholder={"Nombre"}
              type={"text"}
              name={"name"}
              value={userData.name}
              handler={handleChange}
            />

            <Inputs
              placeholder={"Apellidos"}
              type={"text"}
              name={"lastname"}
              value={userData.lastname}
              handler={handleChange}
            />
            <Inputs
              placeholder={"Nombre de usuario"}
              type={"text"}
              name={"username"}
              value={userData.username}
              handler={handleChange}
            />
            <Inputs
              placeholder={"Fecha naciemiento"}
              type={"date"}
              name={"birthday"}
              value={formattedDate}
              handler={handleChange}
            />
            <Button type="submit" variant="primary">
              Enviar
            </Button>
          </Form>
        ) : userData.name ? (
          <div className="box">
            <p>Nombre: {userData.name}</p>
            <p>Apellidos: {userData.lastname}</p>
            <p>Email: {userData.email}</p>
            <p>Nombre de usuario: {userData.username}</p>
            <p>Fecha de cumpleaños: {userData.birthday}</p>
            <p className="text-center">
              <Button variant="secondary" onClick={handleEditar}>
                Editar
              </Button>
            </p>
          </div>
        ) : (
          <div>
            <p>Sin datos</p>
          </div>
        )}
      </Container>
    </>
  );
};
