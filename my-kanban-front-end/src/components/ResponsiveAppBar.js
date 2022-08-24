import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Routes, Route, Switch } from 'react-router-dom';
import Expenses from './TaskCard';
import Invoices from './Column';
import LandingPage from './LandingPage';


function ResponsiveAppBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">HELLO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link>
              <Link to='/'>Home</Link>
            </Nav.Link>

            <Nav.Link>
              <Link to='/invoices'>CREATE +</Link>
            </Nav.Link>

            <NavDropdown title="REACENTS" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1"><Link to='Expenses/Boots'>Boots</Link></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              <Link to='Expenses/Footwear'>Footwear</Link>
              </NavDropdown.Item>
              <NavDropdown.Item ><Link to='Expenses/Sandals'>Sandals</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {/* <Routes>
      <Route exact path='/'><LandingPage/></Route>
      <Route path='/expenses'><Expenses /></Route>
      <Route path='/invoices'><Invoices /></Route> 
    </Routes> */}
    </>
  );
}

export default ResponsiveAppBar;