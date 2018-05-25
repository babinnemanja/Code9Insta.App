import React from 'react';
import { Glyphicon, FormGroup, FormControl, Button } from 'react-bootstrap';

class CommentForm extends React.Component {
    render() {
        const { post, comment, onCommentChange, onCommentSubmit, submitted } = this.props;
        const { id } = post;
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
                    <Button
                        type="submit"
                        disabled={submitted}
                        bsStyle="link"
                        bsSize="small"
                        className="pull-right"
                    >
                        <Glyphicon glyph="plus" />
                    </Button>
                </form>
            </div>
        );
    }
}
export default CommentForm;