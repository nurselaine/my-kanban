import Container from 'react-bootstrap/Container';
import {
  Navbar, 
  Nav,
  OverlayTrigger, 
  Popover 
} from 'react-bootstrap';
import { AiFillFolder, AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai';
import {
  Link,
} from 'react-router-dom';


function ResponsiveAppBar() {

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        Coming Soon!
      </Popover.Body>
    </Popover>
  )

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link>
                <OverlayTrigger trigger='click' placement='top' overlay={popover}>
                <Link to='/create'>TUTORIAL</Link>
                </OverlayTrigger>
              </Nav.Link>
            </Nav>
            <Nav>
            <Navbar.Brand>Contact Me!</Navbar.Brand>
              <ul style={{ display: 'flex', flexDirection: 'row', margin: 'auto', paddingLeft: 'none'}}>
                <li style={{ padding: '10px'}}><a><AiFillFolder className='footer-svg'/></a></li>
                <li style={{ padding: '10px'}}><a href='www.Github.com/nurselaine' target='_blank'><AiOutlineGithub className='footer-svg'/></a></li>
                <li style={{ padding: '10px'}}><a href="www.Linkedin.com/in/nurselaine" target="_blank"><AiOutlineLinkedin className='footer-svg'/></a></li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ResponsiveAppBar;