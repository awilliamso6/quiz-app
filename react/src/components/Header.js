import { Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (
        <header>
            <Navbar bg="dark">
            <Navbar.Brand href="#home">Cool Quiz Time</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
                <Nav.Link href="#privacy">Privacy</Nav.Link>
            </Nav>
            </Navbar>
        </header>
    )
}

export default Header;