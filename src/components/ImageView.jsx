import React from 'react';
import { Glyphicon, Thumbnail, Button } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

class Image extends React.Component {
    renderTags(tags) {
        return _.map(tags, (tag, index) => (<span key={index}>#{tag}&nbsp;</span>));
    }
    render() {
        const { post, deleted, onLikeClick, onDeleteClick } = this.props;
        const { id, imageData, createdBy, description, likes, tags, createdOn } = post;
        const image = `data:image/jpeg;base64,${imageData}`;

        return ( 
            <Thumbnail src={image} alt="image" className="img-thumbnail-insta">
                <h2>{createdBy}</h2>
                <p className="img-date-insta">{moment(createdOn).fromNow()}</p>
                <p>{description}</p>
                <p className="img-tags-insta">{this.renderTags(tags)}</p>
                <hr/>
                <p>
                    <Button bsStyle="link" bsSize="lg" onClick={() => onLikeClick(id)}>
                        <Glyphicon glyph="thumbs-up" />
                    </Button>&nbsp;{likes}&nbsp;
                    <Button bsStyle="link" bsSize="lg" className="pull-right" onClick={() => onDeleteClick(id)} disabled={deleted}>
                        <Glyphicon glyph="trash" />
                    </Button>
                </p>
            </Thumbnail>
        );
    }
}
export default Image;