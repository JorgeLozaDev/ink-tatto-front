import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { getMeetings } from "../../services/apiCalls";
import { Button } from "react-bootstrap";
import "./ListMettings.css";
import { mettingDetails } from "../mettingSlice";
import { detailMettingId } from "../mettingSlice"

export const ListMeetings = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [nextMeetings, setNextMettings] = useState([]);
  const [pastMeetings, setPastMettings] = useState([]);
  const dispatch = useDispatch(mettingDetails);

  useEffect(() => {
    if (token.credentials.length == 0) {
      navigate("/");
      // console.log(token);
    } else {
      getMeetings("meetings/", token.credentials)
        .then((met) => {
          setNextMettings(met.data.upcomingMeetings);
          setPastMettings(met.data.pastMeetings);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const handleDetailMetting = (e) => {
    // console.log(e.target.value);
    dispatch(detailMettingId({ idMetting: e.target.value }));
    navigate("/metting/details");
  };
  return (
    <>
      <Button onClick={() => navigate("/mettings/addMettings")}>
        Añadir cita
      </Button>
      {nextMeetings.length > 0 ? (
        <div className="citasGeneral">
          <h3>PRÓXIMAS CITAS</h3>
          <div className="cajasCitas">
            {nextMeetings.map((meet) => {
              return (
                <div key={meet._id}>
                  <p>{meet.client}</p>
                  <p>{meet.tattooArtist}as</p>
                  <p>{meet.dateMetting}</p>
                  <p>{meet.dateMettingEnd}</p>
                  <p>{meet.typeIntervention}</p>
                  <p>{meet.isUp}</p>
                  <p>{meet.price}</p>
                  <Button
                    value={meet._id}
                    onClick={(e) => handleDetailMetting(e)}
                  >
                    Editar
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <p>Aún no tienes próximas citas</p>
        </div>
      )}
      {pastMeetings.length > 0 ? (
        <div className="citasGeneral">
          <h3>CITAS PASADAS</h3>
          <div className="cajasCitas">
            {pastMeetings.map((cita) => {
              return (
                <div key={cita._id}>
                  <p>{cita.client}</p>
                  <p>{cita.tattooArtist}</p>
                  <p>{cita.dateMetting}</p>
                  <p>{cita.dateMettingEnd}</p>
                  <p>{cita.typeIntervention}</p>
                  <p>{cita.isUp}</p>
                  <p>{cita.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <p>Aún no tienes citas pasadas</p>
        </div>
      )}
    </>
  );
};