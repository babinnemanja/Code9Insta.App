import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';

class HeaderSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Code9 App
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Form pullLeft onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <FormControl id="text" type="text" placeholder="Search" />
                    </FormGroup>{' '}
                    <Button type="submit">Search</Button>
                </Navbar.Form>
            </Navbar>
        );
    }
}
export default HeaderSearch;