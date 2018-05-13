import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, FormControl, Button } from 'react-bootstrap';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { post, comment, onCommentChange, onCommentSubmit, submitted } = this.props;
        const { id } = post;
        console.log("Form: ", id, post);
        return (
            <div>
                <form onSubmit={(e) => onCommentSubmit(e, id)}>
                    <FormGroup>
                        <FormControl
                            id="comment"
                            type="text"
                            value={comment}
                            onChange={onCommentChange}
                        />
                    </FormGroup>
                    <Button type="submit" disabled={submitted}>Add</Button>
                </form>
            </div>
        );
    }
}
export default CommentForm;