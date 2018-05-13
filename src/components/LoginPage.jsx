import React from 'react';
import ReactDOM from 'react-dom';
import { Panel } from 'react-bootstrap';
import Header from './Header';
import LoginForm from './LoginForm'

class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Panel>
                    <Panel.Body>
                        <LoginForm />
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
export default LoginPage;