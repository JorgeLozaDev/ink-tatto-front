import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { ListMeetings } from "../ListMettings/ListMettings";
import { CreateMettings } from "../CreateMettings/CreateMettings";
import { DetailMetting } from "../DetailMetting/DetailMetting";
import { AdminListUsers } from "../AdminListUsers/AdminListUsers";

export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singup" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/mettings" element={<ListMeetings />} />
      <Route path="/mettings/addMettings" element={<CreateMettings />} />
      <Route path="/metting/details" element={<DetailMetting />} />
      <Route path="/admin/listusers" element={<AdminListUsers />} />
    </Routes>
  );
};
