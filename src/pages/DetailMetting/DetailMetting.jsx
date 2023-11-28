import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { mettingDetails } from "../mettingSlice";

export const DetailMetting = () => {
  const idMetting = useSelector(mettingDetails);

  
  useEffect(() => {
    console.log(idMetting.idMetting);
  }, []);
  return <div>DetailMetting</div>;
};
