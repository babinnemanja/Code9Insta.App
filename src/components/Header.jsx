import React from 'react';
import { Navbar } from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return (
            <Navbar className="navbar-insta">
                <Navbar.Header>
                    <Navbar.Brand className="navbar-brand-insta">
                        Code9 Insta
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        );
    }
}
export default Header;