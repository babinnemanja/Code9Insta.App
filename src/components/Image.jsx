import React from 'react';
import ReactDOM from 'react-dom';
import { Thumbnail, Button } from 'react-bootstrap';
import _ from 'lodash';

class Image extends React.Component {
    constructor(props) {
        super(props);
    }
    renderTags(tags) {
        return _.map(tags, (tag, index) => (<span key={index}>#{tag}&nbsp;</span>));
    }
    render() {
        const { post, deleted, onLikeClick, onDeleteClick } = this.props;
        const { id, imageData, createdBy, description, likes, isLikedByUser, tags, createdOn } = post;
        const image = `data:image/jpeg;base64,${imageData}`;

        return (
            <Thumbnail src={image} alt="image">
                <h3>{createdBy}&nbsp;{createdOn}</h3>
                <p>{description}</p>
                <p>{this.renderTags(tags)}</p>
                <p>
                    <Button bsStyle="primary" onClick={() => onLikeClick(id)}>Like</Button>&nbsp;{likes}&nbsp;
                    <Button bsStyle="default" onClick={() => onDeleteClick(id)} disabled={deleted}>Delete</Button>
                </p>
            </Thumbnail>
        );
    }
}
export default Image;