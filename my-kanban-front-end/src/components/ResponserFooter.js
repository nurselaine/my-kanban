import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiFillFolder, AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  Link,
} from 'react-router-dom';


function ResponsiveAppBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link>
                <Link to='/'>ABOUT</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to='/create'>TUTORIAL</Link>
              </Nav.Link>
            </Nav>
            <Nav>
              <div>
                <button><AiFillFolder className='footer-svg'/> </button>
                <button><AiOutlineGithub className='footer-svg'/> </button>
                <button><AiOutlineLinkedin className='footer-svg'/> </button>
              </div>
              <Navbar.Brand href="#home">BRAIN</Navbar.Brand>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ResponsiveAppBar;