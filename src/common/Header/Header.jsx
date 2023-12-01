import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, userDetails } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [decode, setDecode] = useState();

  const handlerLogOut = () => {
    dispatch(logout({ credentials: "" }));
    navigate("/");
  };
  const token = useSelector(userDetails);

  useEffect(() => {
    if (token.credentials != "") {
      setDecode(jwtDecode(token.credentials));
    }
  }, [token]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Ink Masters</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            {token.credentials != "" ? (
              <Nav>
                <NavDropdown title="Menú" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>

                  <NavDropdown.Item href="/mettings">Citas</NavDropdown.Item>
                  <NavDropdown.Divider />

                  {decode && decode.role == "superadmin" ? (
                    <>
                      <NavDropdown.Item href="/admin/listusers">
                        Lista de usuarios
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <></>
                  )}
                  <NavDropdown.Item onClick={handlerLogOut}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/singup">Singup</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
