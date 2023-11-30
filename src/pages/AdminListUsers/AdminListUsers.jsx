import React, { useState } from "react";
import { userDetails } from "../userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/apiCalls";

export const AdminListUsers = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [users, setUsers] = useState();

  const decoded = jwtDecode(token.credentials);

  useEffect(() => {
    if (decoded.role != "superadmin") {
      navigate("/");
    }

    getAllUsers("user", token)
      .then((a) => {
        console.log(a.data.users);
        setUsers(a.data.users);
      })
      .catch((e) => console.log(e));
    console.log(users);
  }, []);

  return <div>Admin</div>;
};
