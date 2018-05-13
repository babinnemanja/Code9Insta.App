import React from 'react';
import ReactDOM from 'react-dom';
import { Panel } from 'react-bootstrap';
import Header from './Header';
import RegisterForm from './RegisterForm'

class RegisterPage extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Panel>
                    <Panel.Body>
                        <RegisterForm />
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
export default RegisterPage;