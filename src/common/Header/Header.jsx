import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, userDetails } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlerLogOut = () => {
    dispatch(logout({ credentials: "" }));
    navigate("/");
  };
  const token = useSelector(userDetails);
  if (token.credentials) {
    const decode = jwtDecode(token.credentials);
    console.log(decode);
  }
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
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="/mettings">Citas</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handlerLogOut}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="admin" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/admin/listusers">
                    Lista de usuarios
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
