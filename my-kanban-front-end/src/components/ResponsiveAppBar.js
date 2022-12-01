import Container from 'react-bootstrap/Container';
import { OverlayTrigger, 
        Popover, 
        Nav, 
        Navbar, 
        NavDropdown 
      } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ResponsiveAppBar() {

  const popover = (
    <Popover id="popover-create">
      <Popover.Body>Create a new board coming soon</Popover.Body>
    </Popover>
  )

  return ( 
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home"><img src='./trello.png' style={{ height: '30px', width: '30px'}} alt='trello-logo' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link>
              <Link to='/'>HOME</Link>
            </Nav.Link>

            <Nav.Link>
              <OverlayTrigger trigger="click" placement='bottom' overlay={popover}>
                <Link to='/create'>CREATE</Link>
              </OverlayTrigger>
            </Nav.Link>

            <NavDropdown title="RECENTS" id="collasible-nav-dropdown">
              <NavDropdown.Item style={{backgroundColor:"grey"}}>Coming Soon!</NavDropdown.Item>
              <NavDropdown.Item style={{backgroundColor:"grey"}} href="#action/3.1">Coming Soon!</NavDropdown.Item>
              <NavDropdown.Item style={{backgroundColor:"grey"}} href="#action/3.1">Coming Soon!</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item style={{backgroundColor:"grey"}}>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default ResponsiveAppBar;