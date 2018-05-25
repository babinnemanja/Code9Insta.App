import React from 'react';
import { withRouter } from 'react-router-dom';
import { Glyphicon, Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';

class HeaderSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostPageClick = this.handlePostPageClick.bind(this);
    }
    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { text } = this.state;
        this.props.onSearch(text);
    }
    handlePostPageClick(e) {
        e.preventDefault();
        this.props.history.push("post");
    }
    render() {
        return (
            <Navbar className="navbar-insta">
                <Navbar.Header>
                    <Navbar.Brand className="navbar-brand-insta">
                        Code9 App
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Form pullLeft>
                    <FormGroup>
                        <FormControl id="text" type="text" placeholder="Search" onChange={this.handleChange} />
                    </FormGroup>{' '}
                    <Button bsStyle="link" onClick={this.handleSubmit}>
                        <Glyphicon glyph="search" />
                    </Button>
                </Navbar.Form>
                <Nav pullRight>
                    <NavItem href="#" onClick={this.handlePostPageClick}>
                        <Glyphicon glyph="upload" />
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}
export default withRouter(HeaderSearch);