import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar } from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Code9 App
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        );
    }
}

export default Header;