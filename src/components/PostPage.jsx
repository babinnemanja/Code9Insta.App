import React from 'react';
import { Panel } from 'react-bootstrap';
import Header from './Header';
import PostForm from './PostForm'

class PostPage extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Panel className="panel-insta">
                    <Panel.Body>
                        <PostForm />
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
export default PostPage;