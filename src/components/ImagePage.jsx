import React from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { serviceConfig } from '../appSettings';
import { Glyphicon, Navbar, Panel, Button } from 'react-bootstrap';
import _ from 'lodash';
import ImageView from './ImageView';
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
        console.log("Comments:", comments);
        return (
            <Panel className="comments-insta">
                <Panel.Body>
                    <h4>comments</h4>
                    <hr/>
                    {_.map(comments, (comment, index) => (
                        <p key={index}>
                            <span><strong>{comment.handle}</strong>:&nbsp;</span>
                            {comment.text}
                            <Button bsStyle="link" bsSize="small" className="pull-right" onClick={() => this.deleteComment(id, comment.id)}>
                                <Glyphicon glyph="trash" />
                            </Button>
                        </p>
                    ))}
                </Panel.Body>
            </Panel>
        );
    }
    render() {
        const { post, comments, comment, deleted, submitted } = this.state;

        if (!post || !post.imageData) {
            return (<div className="loader"></div>);
        }
        console.log("Studd:", this.state);
        return (
            <div>
                <Navbar className="navbar-insta">
                    <Navbar.Header>
                        <Button bsStyle="link" bsSize="large" className="back-btn-insta" onClick={this.handleBackClick}>
                            <Glyphicon glyph="chevron-left" />
                        </Button>
                    </Navbar.Header>
                </Navbar>
                <div>
                    <ImageView
                        post={post}
                        deleted={deleted}
                        onLikeClick={(id) => this.handleLikeClick(id)}
                        onDeleteClick={(id) => this.handleDeleteClick(id)}
                    />
                    <Panel className="comments-insta">
                        <Panel.Body>
                            <CommentForm
                                post={post}
                                comment={comment}
                                submitted={submitted}
                                onCommentChange={this.handleCommentChange}
                                onCommentSubmit={(e, id) => this.handleCommentSubmit(e, id)}
                            />
                        </Panel.Body>
                    </Panel>
                    {this.renderComments(post.id, comments)}
                </div>
            </div>
        );
    }
}
export default withRouter(ImagePage);