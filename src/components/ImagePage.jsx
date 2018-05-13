import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../appSettings';
import { Panel, Button } from 'react-bootstrap';
import _ from 'lodash';
import Image from './Image';
import CommentForm from './CommentForm'

class ImagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            comment: '',
            deleted: false,
            submitted: false
        };
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.loadImage(id);
        this.loadComments(id);
    }
    handleBackClick() {
        this.props.history.push('/profile');
    }
    handleLikeClick(id) {
        this.likeImage(id);
    }
    handleDeleteClick(id) {
        this.setState({ deleted: true });
        this.deleteImage(id);
    }
    handleCommentSubmit(e, id) {
        e.preventDefault();
        this.setState({ submitted: true });
        this.addComment(id);
    }
    handleCommentChange(e) {
        const { id, value } = e.target;
        console.log("Change: ", id, value);
        this.setState({ [id]: value });
    }
    loadImage(id) {
        const user = JSON.parse(localStorage.getItem('user'));

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };

        fetch(`${serviceConfig.baseURL}/posts/${id}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    this.setState({ post: data });
                }
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
            });
    }
    likeImage(id) {
        const user = JSON.parse(localStorage.getItem('user'));

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };

        fetch(`${serviceConfig.baseURL}/posts/${id}/reactToPost`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response;
            })
            .then(response => {
                this.loadImage(id);
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
            });
    }
    deleteImage(id) {
        const user = JSON.parse(localStorage.getItem('user'));

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };

        fetch(`${serviceConfig.baseURL}/posts/${id}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response;
            })
            .then(response => {
                this.props.history.push('/profile');
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ deleted: false });
            });
    }
    loadComments(id) {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("loadComments",id);

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };

        fetch(`${serviceConfig.baseURL}/comments/GetPostComments?postId=${id}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log("Data comments: ", data);
                    this.setState({ comments: data });
                }
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
            });
    }
    addComment(id) {
        const user = JSON.parse(localStorage.getItem('user'));
        const { comment } = this.state;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };

        fetch(`${serviceConfig.baseURL}/comments?postId=${id}&text=${comment}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.statusText;
            })
            .then(message => {
                //NotificationManager.success(message);
                this.setState({
                    comment: '',
                    submitted: false
                });
                this.loadComments(id);
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ submitted: false });
            });
    }
    deleteComment(id, commentId) {
        const user = JSON.parse(localStorage.getItem('user'));
        
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };

        fetch(`${serviceConfig.baseURL}/comments?commentId=${commentId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response;
            })
            .then(response => {
                this.loadComments(id);
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText);
                this.setState({ commentDeleted: false });
            });
    }
    renderComments(id, comments) {
        return _.map(comments, (comment, index) => (
            <Panel key={index}>
                <Panel.Heading>
                    <Button bsStyle="default" onClick={() => this.deleteComment(id, comment.id)}>Delete</Button>
                </Panel.Heading>
                <Panel.Body>
                    {comment.text}
                </Panel.Body>
            </Panel>
        ));
    }
    render() {
        const { post, comments, comment, deleted, submitted } = this.state;
        
        return (
            <Panel>
                <Panel.Heading>
                    <Button bsStyle="default" onClick={this.handleBackClick}>Back</Button>
                </Panel.Heading>
                <Panel.Body>
                    <Image
                        post={post}
                        deleted={deleted}
                        onLikeClick={(id) => this.handleLikeClick(id)}
                        onDeleteClick={(id) => this.handleDeleteClick(id)}
                    />
                    <CommentForm
                        post={post}
                        comment={comment}
                        submitted={submitted}
                        onCommentChange={this.handleCommentChange}
                        onCommentSubmit={(e, id) => this.handleCommentSubmit(e, id)}
                    />
                    {this.renderComments(post.id, comments)}
                </Panel.Body>
            </Panel>
        );
    }
}
export default withRouter(ImagePage);