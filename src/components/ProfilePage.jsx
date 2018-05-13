import React from 'react';
import ReactDOM from 'react-dom';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../appSettings';
import HeaderSearch from './HeaderSearch';
import ImageList from './ImageList';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            posts: []
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.getPosts();
    }
    getPosts() {
        const { text } = this.state;
        const user = JSON.parse(localStorage.getItem('user'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };

        fetch(`${serviceConfig.baseURL}/posts/all?searchString=${text}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log("Data: ", data);
                    this.setState({ posts: data });
                }
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }
    handleSearch(text) {
        this.setState({ text }, () => this.getPosts());
    }
    render() {
        const { posts } = this.state;
        return (
            <div>
                <HeaderSearch onSearch={this.handleSearch} />
                <ImageList data={posts} />
            </div>
        );
    }
}
export default ProfilePage;