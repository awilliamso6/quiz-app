import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

function Navbar() {
    const location = useLocation();

    if (location.pathname === '/quiz') {
        return null;
    }
    
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;