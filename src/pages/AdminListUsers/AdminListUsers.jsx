import React, { useState } from "react";
import { userDetails } from "../userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/apiCalls";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./AdminListUsers.css";
import Input from "../../common/Input/Input";

export const AdminListUsers = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const decoded = jwtDecode(token.credentials);
  const limit = 5;
  const [searchQuery, setSearchQuery] = useState({
    search: "",
  });
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    // Use a debounce function to delay the search
    const debounceSearch = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 350);

    return () => {
      clearTimeout(debounceSearch);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (decoded.role != "superadmin") {
      navigate("/");
    }

    getAllUsers(`user?page=${currentPage}&limit=${limit}`, token, searchQuery)
      .then((a) => {
        // console.log(a.data);
        setUsers(a.data.users);
        setCurrentPage(a.data.currentPage);
        setTotalPages(a.data.totalPages);
        setTotalUsers(a.data.totalUsers);
      })
      .catch((e) => console.log(e));
  }, [currentPage, debouncedSearchQuery]);

  const handleDetailMetting = (e) => {
    // dispatch(detailMettingId({ idMetting: e.target.value }));
    // navigate("/metting/details");
    console.log(e);
  };

  const inputHandler = (value, name) => {
    setSearchQuery((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Container className="contenido listUserDesign">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Input
              placeholder={"Busca por nombre o email"}
              type={"text"}
              name={"search"}
              handler={inputHandler}
            />
          </Col>
          <Col md={4}></Col>
        </Row>
        <Row>
          <Col>
            {users.length > 0 ? (
              <div className="citasGeneral">
                <div className="cajasCitas">
                  {users.map((meet) => {
                    return (
                      <div key={meet._id} className="box">
                        <p>
                          Cliente : {meet.name} {meet.lastname}
                        </p>
                        <p>Email: {meet.email}</p>
                        <p className="text-center">
                          <Button
                            value={meet._id}
                            onClick={(e) => handleDetailMetting(e)}
                            variant="secondary"
                          >
                            Editar
                          </Button>
                        </p>
                      </div>
                    );
                  })}
                </div>

                {totalUsers > limit && (
                  <div className="btnPaginado">
                    <button
                      onClick={() =>
                        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Pag Anterior
                    </button>

                    <span>
                      {" "}
                      Pag {currentPage} de {totalPages}{" "}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage((prevPage) =>
                          Math.min(prevPage + 1, totalPages)
                        )
                      }
                      disabled={currentPage === totalPages}
                    >
                      Siguiente Pag
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>Sin información</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
