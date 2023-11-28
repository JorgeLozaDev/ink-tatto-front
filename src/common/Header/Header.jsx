import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlerLogOut = () => {
    dispatch(logout({ credentials: "" }));
    navigate("/");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Ink tatto</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/singup">Singup</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
                <NavDropdown.Item href="/mettings">Citas</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Item 3</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handlerLogOut}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
