
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { UpdateProfile } from "../UpdateProfile/UpdateProfile";

export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singup" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/updateProfile" element={<UpdateProfile />} />
    </Routes>
  );
};
