import React from "react";
import { userDetails } from "../userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AdminListUsers = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();

  const decoded = jwtDecode(token.credentials);

  useEffect(() => {
    if (decoded.role != "superadmin") {
      navigate("/");
    }
  }, []);

  return <div>Admin</div>;
};
