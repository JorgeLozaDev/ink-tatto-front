import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Inputs from "../../common/Input/Input";
import CustomSelect from "../../common/CustomSelect/CustomSelect";
import {
  checkArtistAvaiabilityDates,
  allArtistActives,
} from "../../services/apiCalls";

export const CreateMettings = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    dateMetting: "",
    dateMettingEnd: "",
    tattooArtist: "",
    typeIntervention: "",
  });
  const [artist, setArtist] = useState([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (token.credentials.length == 0) {
      navigate("/");
    }

    allArtistActives("user/availabletattooArtists", token)
      .then((artist) => {
        setArtist(artist.data.tattooArtists);
      })
      .catch((e) => console.log(e));
  }, []);

  const inputHandler = (value, name) => {
    const currentDate = new Date();
    const selectedDate = new Date(value);

    // Validar que la fecha y hora seleccionadas no sean anteriores a la actual
    if (selectedDate < currentDate) {
      console.log("La fecha y hora seleccionadas deben ser en el futuro.");
      setIsValid(false);
      return;
    }

    // Validar que dateMettingEnd no sea menor o igual que dateMetting
    if (name === "dateMettingEnd") {
      const dateMettingValue = new Date(dataForm.dateMetting);
      if (selectedDate <= dateMettingValue) {
        console.log(
          "La fecha y hora de fin debe ser posterior a la fecha y hora de inicio."
        );
        setIsValid(false);
        return;
      }
    }

    setIsValid(true);
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlerLogin = (event) => {
    checkArtistAvaiabilityDates("meetings/checkavailability", token, dataForm)
      .then((dat) => {
        console.log(dat);
        // dispatch(login({ credentials: dat.data.token }));
        // navigate("/profile");
      })
      .catch((e) => console.log(e.response.data));
    event.preventDefault();
    // event.preventDefault();
  };
  // console.log(dataForm);
  return (
    <>
      <Container>
        <Form onSubmit={handlerLogin} method="post">
          <Inputs
            placeholder={"Fecha naciemiento"}
            type={"datetime-local"}
            min={new Date()}
            name={"dateMetting"}
            handler={inputHandler}
          />
          <Inputs
            placeholder={"Fecha naciemiento"}
            type={"datetime-local"}
            min={new Date()}
            name={"dateMettingEnd"}
            handler={inputHandler}
          />
          <CustomSelect
            options={[
              { value: "tattoo", label: "Tattoo" },
              { value: "piercing", label: "Piercing" },
            ]}
            placeholder="Seleccione un tipo de intervención"
            name="typeIntervention"
            handler={inputHandler}
            value={dataForm.typeIntervention}
            disabled={false} // o true según tus necesidades
            className="tu-clase-estilo"
          />
          {artist.length > 0 ? (
            <CustomSelect
              options={artist.map((art) => ({
                value: art._id,
                label: art.name,
              }))}
              placeholder="Seleccione un artista"
              name="tattooArtist"
              handler={inputHandler}
              value={dataForm.tattooArtist}
              disabled={false}
              className="tu-clase-estilo"
            />
          ) : (
            <div>
              <p>Sin información</p>
            </div>
          )}

          <Button type="submit" variant="primary" disabled={isValid ? "false":"true"}>
            Enviar
          </Button>
        </Form>
      </Container>
    </>
  );
};
