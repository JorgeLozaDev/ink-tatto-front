import React, { useEffect, useState } from "react";
import { profileUser, updateProfile } from "../../services/apiCalls";
import { Form, Button, Container } from "react-bootstrap";
import Inputs from "../../common/Input/Input";
import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import CustomPopup from "../../common/CustomPopup/CustomPopup";

export const Profile = () => {
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState("");

  const token = useSelector(userDetails);

  useEffect(() => {
    if (token.credentials == "") {
      navigate("/");
    }

    profileUser("user/profile", token.credentials)
      .then((e) => {
        setUserData(e.data);
      })
      .catch((e) => {
        console.log(e);
        handleServerError(e);
      });
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
        setEdit(false);
      })
      .catch((e) => {
        console.log(e.response);
        handleServerError(e);
      });
    event.preventDefault();
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString("es-ES", options);
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
            <p className="text-center">
              <Button type="submit" variant="secondary">
                Enviar
              </Button>
            </p>
          </Form>
        ) : userData.name ? (
          <div className="box">
            <p>Nombre: {userData.name}</p>
            <p>Apellidos: {userData.lastname}</p>
            <p>Email: {userData.email}</p>
            <p>Nombre de usuario: {userData.username}</p>
            <p>Fecha de cumpleaños: {formatDateTime(userData.birthday)}</p>
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
      <CustomPopup
        show={showPopup}
        onHide={handleClosePopup}
        title={popupTitle}
        content={popupContent}
      />
    </>
  );
};
