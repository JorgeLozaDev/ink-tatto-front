import React, { useState } from "react";
import { userDetails } from "../userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/apiCalls";
import { Button } from "react-bootstrap";

export const AdminListUsers = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const decoded = jwtDecode(token.credentials);

  useEffect(() => {
    if (decoded.role != "superadmin") {
      navigate("/");
    }

    getAllUsers(`user?page=${currentPage}&limit=5`, token)
      .then((a) => {
        // console.log(a.data);
        setUsers(a.data.users);
        setCurrentPage(a.data.currentPage);
        setTotalPages(a.data.totalPages);
        setTotalUsers(a.data.totalUsers);
      })
      .catch((e) => console.log(e));
    // console.log(users);
  }, [currentPage]);

  const handleDetailMetting = (e) => {
    // dispatch(detailMettingId({ idMetting: e.target.value }));
    // navigate("/metting/details");
    console.log(e);
  };

  return (
    <>
      {users.length > 0 ? (
        <div className="citasGeneral">
          <div className="cajasCitas">
            {users.map((meet) => {
              return (
                <div key={meet._id}>
                  <p>
                    Cliente : {meet.name} {meet.lastname}
                  </p>
                  <p>Email: {meet.email}</p>
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
          <div>
            <button
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Previous Page
            </button>

            <span>
              {" "}
              Page {currentPage} of {totalPages}{" "}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Sin información</p>
        </div>
      )}
    </>
  );
};
