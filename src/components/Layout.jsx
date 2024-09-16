import React, { useContext } from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Layout.css'; // Include any additional CSS for the layout
import { AuthContext } from './AuthContext'; // Import your AuthContext

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const { username } = useContext(AuthContext); // Use username from AuthContext

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goToStudentDash = () => {
    navigate('/student-dash');
  };

  const goToAnalytics = () => {
    navigate('/analytics');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar with responsive Offcanvas */}
      <Navbar expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand className="h3 text-white">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  className={`custom-nav-link mx-2 ${currentLocation.pathname === '/student-dash' ? 'active' : ''}`}
                  onClick={goToStudentDash}
                >
                  Student Dash
                </Nav.Link>
                <Nav.Link
                  className={`custom-nav-link mx-2 ${currentLocation.pathname === '/analytics' ? 'active' : ''}`}
                  onClick={goToAnalytics}
                >
                  Analytics
                </Nav.Link>
                <Nav.Item className="d-flex align-items-center">
                  <span className="mx-2 username-text">{username}</span>
                  <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout}  className="logout-icon" style={{ cursor: 'pointer' }} />
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="flex-fill">
        <Container>{children}</Container>
      </main>

      {/* Footer */}
      <footer className="footer text-center">
        <p>&copy; 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default Layout;
