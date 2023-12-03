import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mettingDetails } from "../mettingSlice";
import { Container, Form, Button } from "react-bootstrap";
import Inputs from "../../common/Input/Input";
import CustomSelect from "../../common/CustomSelect/CustomSelect";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../userSlice";
import {
  allArtistActives,
  detailMetting,
  updateMetting,
} from "../../services/apiCalls";
import { removeIdMetting } from "../mettingSlice";
import "./DetailMetting.css"

export const DetailMetting = () => {
  const token = useSelector(userDetails);
  const idMetting = useSelector(mettingDetails);
  const [artist, setArtist] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    dateMetting: new Date().toISOString(),
    dateMettingEnd: new Date().toISOString(),
    tattooArtist: "",
    typeIntervention: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (token.credentials.length == 0) {
      navigate("/");
    }

    allArtistActives("user/availabletattooArtists", token)
      .then((artist) => {
        setArtist(artist.data.tattooArtists);
      })
      .catch((e) => console.log(e));

    detailMetting("meetings/" + idMetting.idMetting, token)
      .then((m) => {
        // console.log(m.data);
        setDataForm({
          dateMetting: m.data.dateMetting,
          dateMettingEnd: m.data.dateMettingEnd,
          tattooArtist: m.data.tattooArtist._id,
          typeIntervention: m.data.typeIntervention,
        });
      })
      .catch((e) => console.log(e));
  }, []);

  const handlerSubmit = (e) => {
    // console.log(dataForm);
    updateMetting(
      "meetings/edit-meeting/" + idMetting.idMetting,
      token,
      dataForm
    )
      .then((m) => {
        console.log(m);
        dispatch(removeIdMetting({ idMetting: "" }));
        navigate("/mettings");
      })
      .catch((e) => console.log(e));
    e.preventDefault();
  };

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
  const startDate = dataForm.dateMetting
    ? new Date(dataForm.dateMetting)
        .toISOString()
        .slice(0, 16) // Obtener los primeros 16 caracteres, eliminando milisegundos y zona horaria
        .replace("T", " ") // Reemplazar "T" con un espacio
    : "";
  const dateEnd = dataForm.dateMettingEnd
    ? new Date(dataForm.dateMettingEnd)
        .toISOString()
        .slice(0, 16) // Obtener los primeros 16 caracteres, eliminando milisegundos y zona horaria
        .replace("T", " ") // Reemplazar "T" con un espacio
    : "";
  return (
    <>
      <Container className="contenido detailMettingDesign">
        <Form method="post" onSubmit={handlerSubmit}>
          <Inputs
            placeholder={"Fecha naciemiento"} 
            type={"datetime-local"}
            min={startDate}
            name={"dateMetting"}
            value={startDate}
            handler={inputHandler}
          />
          <Inputs
            placeholder={"Fecha naciemiento"}
            type={"datetime-local"}
            min={dateEnd}
            value={dateEnd}
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
          <p className="text-center">
          <Button
            type="submit"
            variant="secondary"
            disabled={isValid ? false : true}
          >
            Enviar
          </Button>

          </p>
        </Form>
      </Container>
    </>
  );
};
