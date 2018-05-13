import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../appSettings';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            submitted: false
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

        this.setState({ submitted: true });
        const { username, email, password } = this.state;
        if (username && email && password) {
            this.register();
        } else {
            this.setState({ submitted: false });
        }
    }
    register() {
        const { username, email, password } = this.state;

        const data = {
            Handle: username,
            IsPublic: true,
            User: {
                UserName: username,
                Password: password,
                Email: email
            }
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        fetch(`${serviceConfig.baseURL}/profile`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(message => {
                NotificationManager.success(message);
                this.props.history.push('/login');
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }
    render() {
        const { username, email, password, submitted } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <FormControl
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button type="submit" disabled={submitted}>Register</Button>
                </form>
            </div>
        );
    }
}
export default withRouter(RegisterForm);