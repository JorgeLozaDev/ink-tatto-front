import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { filterMettings, getMeetings } from "../../services/apiCalls";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./ListMettings.css";
import { mettingDetails } from "../mettingSlice";
import { detailMettingId } from "../mettingSlice";
import Inputs from "../../common/Input/Input";
import CustomSelect from "../../common/CustomSelect/CustomSelect";
import { allArtistActives } from "../../services/apiCalls";

export const ListMeetings = () => {
  const [artist, setArtist] = useState([]);
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [nextMeetings, setNextMettings] = useState([]);
  const [pastMeetings, setPastMettings] = useState([]);
  const dispatch = useDispatch(mettingDetails);
  const [mettingsAfterFilter, setMettingsAfterFilter] = useState([]);
  

  const [dataForm, setDataForm] = useState({
    dateMetting: "",
    dateMettingEnd: "",
    tattooArtist: "",
    typeIntervention: "",
  });

  useEffect(() => {
    if (token.credentials.length == 0) {
      navigate("/");
      // console.log(token);
    } else {
      getMeetings("meetings/", token.credentials)
        .then((met) => {
          setNextMettings(met.data.upcomingMeetings);
          setPastMettings(met.data.pastMeetings);
          // console.log(met);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const handleDetailMetting = (e) => {
    dispatch(detailMettingId({ idMetting: e.target.value }));
    navigate("/metting/details");
  };

  const inputHandler = (value, name) => {
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    allArtistActives("user/availabletattooArtists", token)
      .then((artist) => {
        setArtist(artist.data.tattooArtists);
      })
      .catch((e) => console.log(e));
  }, []);

  const handlerSearch = (event) => {
    filterMettings("meetings/filter", token, dataForm)
      .then((a) => {
        // console.log(a.data.meetings);
        setMettingsAfterFilter(a.data.meetings);
      })
      .catch((e) => console.log(e));
    // console.log(dataForm);
    event.preventDefault();
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString("es-ES", options);
  };

  return (
    <>
      <Container className="contenido listadoCitasDesing">
        <Row>
          <Col>
            <p className="text-center py-3">
              <Button
                variant="secondary"
                onClick={() => navigate("/mettings/addMettings")}
              >
                Añadir cita
              </Button>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form method="post" onSubmit={handlerSearch}>
              <Row className="align-items-center">
                <Col xs={12} md={2}>
                  <Form.Label>Desde</Form.Label>
                  <Inputs
                    placeholder={"Fecha naciemiento"}
                    type={"date"}
                    name={"dateMetting"}
                    handler={inputHandler}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <Form.Label>Hasta</Form.Label>
                  <Inputs
                    placeholder={"Fecha naciemiento"}
                    type={"date"}
                    name={"dateMettingEnd"}
                    handler={inputHandler}
                  />
                </Col>

                <Col xs={12} md={3}>
                  <Form.Label>Tipo de intervención</Form.Label>
                  <CustomSelect
                    options={[
                      { value: "tattoo", label: "Tattoo" },
                      { value: "piercing", label: "Piercing" },
                    ]}
                    placeholder="Seleccione un tipo de intervención"
                    name="typeIntervention"
                    handler={inputHandler}
                    disabled={false} // o true según tus necesidades
                    className="tu-clase-estilo"
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Label>Tatuador:</Form.Label>
                  <CustomSelect
                    options={artist.map((art) => ({
                      value: art._id,
                      label: art.name,
                    }))}
                    placeholder="Seleccione un artista"
                    name="tattooArtist"
                    handler={inputHandler}
                    disabled={false}
                    className="tu-clase-estilo"
                  />
                </Col>
                <Col xs={12} md={2}>
                  <Button type="submit" variant="secondary">
                    Buscar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {mettingsAfterFilter.length > 0 ? (
              <div className="citasGeneral">
                <h3>FILTRADO CITAS</h3>
                <div className="cajasCitas ">
                  {mettingsAfterFilter.map((filterMeet) => {
                    return (
                      <div key={filterMeet._id} className="box">
                        <p>Artista: {filterMeet.tattooArtist}</p>
                        <p>
                          Fecha inicio: {formatDateTime(filterMeet.dateMetting)}
                        </p>
                        <p>
                          Fecha fin: {formatDateTime(filterMeet.dateMettingEnd)}
                        </p>
                        <p>Tipo intervención: {filterMeet.typeIntervention}</p>
                        <p>Precio: {filterMeet.price}</p>
                        {/* <Button
                    value={filterMeet._id}
                    onClick={(e) => handleDetailMetting(e)}
                  >
                    Editar
                  </Button> */}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                {nextMeetings.length > 0 ? (
                  <div className="citasGeneral">
                    <h3>PRÓXIMAS CITAS</h3>
                    <div className="cajasCitas ">
                      {nextMeetings.map((meet) => {
                        return (
                          <div key={meet._id} className="box">
                            <p>Artista: {meet.tattooArtist}</p>
                            <p>
                              Fecha inicio: {formatDateTime(meet.dateMetting)}
                            </p>
                            <p>
                              Fecha fin: {formatDateTime(meet.dateMettingEnd)}
                            </p>
                            <p>Tipo intervención: {meet.typeIntervention}</p>

                            <p>Precio: {meet.price}</p>
                            <p className="text-center">
                              <Button
                                value={meet._id}
                                variant="secondary"
                                onClick={(e) => handleDetailMetting(e)}
                              >
                                Editar
                              </Button>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="citasGeneral">
                    <h3>PRÓXIMAS CITAS</h3>
                    <p>Aún no tienes próximas citas</p>
                  </div>
                )}
                {pastMeetings.length > 0 ? (
                  <div className="citasGeneral">
                    <h3>CITAS PASADAS</h3>
                    <div className="cajasCitas ">
                      {pastMeetings.map((cita) => {
                        return (
                          <div key={cita._id} className="box">
                            <p>Artista: {cita.tattooArtist}</p>
                            <p>
                              Fecha Inicio: {formatDateTime(cita.dateMetting)}
                            </p>
                            <p>
                              Fecha Fin: {formatDateTime(cita.dateMettingEnd)}
                            </p>
                            <p>Tipo de cita: {cita.typeIntervention}</p>
                            <p>Precio: {cita.price}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="citasGeneral">
                    <h3>PRÓXIMAS CITAS</h3>
                    <p>Aún no tienes citas pasadas</p>
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
