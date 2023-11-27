import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { getMeetings } from "../../services/apiCalls";

export const ListMeetings = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [nextMeetings, setNextMettings] = useState([]);
  const [pastMeetings, setPastMettings] = useState([]);

  useEffect(() => {
    if (token.credentials.length == 0) {
      // navigate("/");
      console.log(token);
    } else {
      getMeetings("meetings/", token.credentials)
        .then((met) => {
          // console.log(met.data);
          setNextMettings(met.data.upcomingMeetings);
          setPastMettings(met.data.pastMeetings);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <>
      {nextMeetings.length > 0 ? (
        <div>
          {nextMeetings.map((meet) => {
            return (
              <div key={meet.id}>
                <p>{meet.client}</p>
                <p>{meet.tattoArtist}</p>
                <p>{meet.dateMetting}</p>
                <p>{meet.dateMettingEnd}</p>
                <p>{meet.typeIntervention}</p>
                <p>{meet.isUp}</p>
                <p>{meet.price}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p>Aún no tienes próximas citas</p>
        </div>
      )}
      {pastMeetings.length > 0 ? (
        <div>
          {pastMeetings.map((cita) => {
            return (
              <div key={cita.id}>
                <p>{cita.client}</p>
                <p>{cita.tattoArtist}</p>
                <p>{cita.dateMetting}</p>
                <p>{cita.dateMettingEnd}</p>
                <p>{cita.typeIntervention}</p>
                <p>{cita.isUp}</p>
                <p>{cita.price}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p>Aún no tienes citas pasadas</p>
        </div>
      )}
    </>
  );
};
