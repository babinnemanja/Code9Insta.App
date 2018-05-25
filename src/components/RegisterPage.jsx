import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Panel, Button } from 'react-bootstrap';
import Header from './Header';
import RegisterForm from './RegisterForm';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }
    handleLinkClick(e) {
        e.preventDefault();
        this.props.history.push('/login');
    }
    render() {
        return (
            <div>
                <Header />
                <Grid fluid={true}>
                    <Row>
                        <Panel className="panel-insta">
                            <Panel.Body>
                                <RegisterForm />
                            </Panel.Body>
                        </Panel>
                    </Row>
                    <Row>
                        <Panel className="panel-insta">
                            <Panel.Body>
                                <div className="text-center">
                                    Have an account?
                                    <Button bsStyle="link" onClick={this.handleLinkClick}>Log in</Button>
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default withRouter(RegisterPage);