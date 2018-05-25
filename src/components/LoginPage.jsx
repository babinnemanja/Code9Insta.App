import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Panel, Button } from 'react-bootstrap';
import Header from './Header';
import LoginForm from './LoginForm'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }
    handleLinkClick(e) {
        e.preventDefault();
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <Header />
                <Grid fluid={true}>
                    <Row>
                        <Panel className="panel-insta">
                            <Panel.Body>
                                <LoginForm />
                            </Panel.Body>
                        </Panel>
                    </Row>
                    <Row>
                        <Panel className="panel-insta">
                            <Panel.Body>
                                <div className="text-center">
                                    Don't have an account?
                                    <Button bsStyle="link" onClick={this.handleLinkClick}>Sign up</Button>
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default withRouter(LoginPage);