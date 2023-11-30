import React, { useEffect, useState } from "react";
import { profileUser, updateProfile } from "../../services/apiCalls";
import { Form, Button, Container } from "react-bootstrap";
import Inputs from "../../common/Input/Input";
import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";

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
      <Container>
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
          <div>
            <p>{userData.name}</p>
            <p>{userData.lastname}</p>
            <p>{userData.email}</p>
            <p>{userData.username}</p>
            <p>{userData.birthday}</p>
          </div>
        ) : (
          <div>
            <p>Sin datos</p>
          </div>
        )}
        <Button onClick={handleEditar}>Editar</Button>
      </Container>
    </>
  );
};
