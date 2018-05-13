import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../appSettings';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
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
        const { username, password } = this.state;
        if (username && password) {
            this.login();
        } else {
            this.setState({ submitted: false });
        }
    }
    login() {
        const { username, password } = this.state;

        fetch(`${serviceConfig.baseURL}/token/request?username=${username}&password=${password}`)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.token) {
                    localStorage.setItem('user', JSON.stringify(data));
                }
                this.props.history.push('/profile');
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }
    render() {
        const { username, password, submitted } = this.state;
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
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button type="submit" disabled={submitted}>Login</Button>
                </form>
            </div>
        );
    }
}
export default withRouter(LoginForm);