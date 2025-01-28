import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/antique-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../../features/users/usersSlice";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.users);

  return (
    <Navbar
      expand="lg"
      style={{ fontWeight: "bold" }}
      className="bg-body-tertiary py-0 fs-6"
    >
      <Container fluid style={{backgroundColor: "ghostwhite"}}>
        <div className="d-flex gap-3 align-items-center">
          <NavLink to={"/"}>
            <img src={Logo} style={{ height: "60px" ,padding: "5px"}} alt="Antique Apparatus" />
          </NavLink>
          {isLoggedIn &&
          !(location.pathname.indexOf("/admin/addproducts") !== -1) ? (
            <>
              <NavLink to={"/shop"}>Shop</NavLink>
              <NavLink to={"/invoices"}>CartList</NavLink>
            </>
          ) : null}
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Form className="d-flex gap-3">
            {!isLoggedIn ? (
              <>
                <Nav.Link
                  onClick={() => {
                    dispatch(logOut());
                    navigate("/login");
                  }}
                  title="Log-in"
                >
                  <i className="fa-solid fa-right-to-bracket fa-xl" />
                </Nav.Link>
                <NavLink to={"/signup"} title="Sign-up">
                  <i className="fa-solid fa-user-plus fa-xl" />
                </NavLink>
              </>
            ) : (
              <>
                {isLoggedIn &&
                !(location.pathname.indexOf("/admin/addproducts") !== -1) ? (
                  <NavLink to={"/admin"}>Admin</NavLink>
                ) : null}

                <Nav.Link
                  onClick={() => {
                    if (
                      location.pathname.indexOf("/admin/addproducts") !== -1
                    ) {
                      navigate("/admin");
                      localStorage.removeItem("adminLogin");
                    } else {
                      navigate("/login");
                      dispatch(logOut());
                    }
                  }}
                  title={
                    location.pathname.indexOf("/admin/addproducts") !== -1
                      ? "Admin Log-out"
                      : "Log-out"
                  }
                >
                  <i className="fa-solid fa-right-from-bracket fa-xl" />
                </Nav.Link>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
