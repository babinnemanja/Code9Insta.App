import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../appSettings';
import _ from 'lodash';

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            imageFile: null,
            tags: '',
            description: '',
            submitted: false,
            loaded: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { id, value, type } = e.target;
        this.setState({ [id]: value });
        if (type === 'file') {
            this.readFile(e.target.files[0]);
        }
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { loaded } = this.state;
        if (loaded) {
            this.upload();
        } else {
            this.setState({ submitted: false });
        }
    }
    readFile(file) {
        const _this = this;
        const reader = new FileReader();
        reader.onload = function () {
            const arrayBuffer = reader.result;
            if (arrayBuffer) {
                const byteArray = new Uint8Array(arrayBuffer);
                const array = _.map(byteArray, (i) => i);
                _this.setState({ imageFile: array, loaded: true });
            }
        };
        reader.readAsArrayBuffer(file);
    }
    upload() {
        const { imageFile, tags, description } = this.state;
        const user = JSON.parse(localStorage.getItem('user'));

        const data = {
            ImageData: imageFile,
            Tags: _.split(tags, ' '),
            Description: description
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(`${serviceConfig.baseURL}/posts`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(message => {
                NotificationManager.success(message);
                this.props.history.push('/profile');
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }
    render() {
        const { image, tags, description, submitted } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <FormControl
                            id="image"
                            type="file"
                            placeholder="Username"
                            value={image}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            id="tags"
                            placeholder="Tags"
                            componentClass="textarea"
                            value={tags}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            id="description"
                            placeholder="Description"
                            componentClass="textarea"
                            value={description}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button type="submit" disabled={submitted} className="btn-insta" block>Upload</Button>
                </form>
            </div>
        );
    }
}
export default withRouter(PostForm);