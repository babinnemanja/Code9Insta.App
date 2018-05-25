import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import _ from 'lodash';

class ImageList extends React.Component {
    constructor(props) {
        super(props);
        this.handleImageClick = this.handleImageClick.bind(this);
    }
    handleImageClick(id) {
        const newUrl = `${this.props.location.pathname}/${id}`;
        this.props.history.push(newUrl);
    }
    renderRows(rows) {
        const _this = this;
        return _.map(rows, (columns, index) => (
            <Row key={index}>
                {_this.renderColumns(columns)}
            </Row>
        ));
    }
    renderColumns(columns) {
        return _.map(columns, (column, index) => {
            const { id, imageData } = column;
            const image = `data:image/jpeg;base64,${imageData}`;
            return (
                <Col key={index} xs={6} md={3}>
                    <Thumbnail
                        href="#"
                        alt="image"
                        src={image}
                        className="thumbnail-insta"
                        onClick={() => this.handleImageClick(id)}
                    />
                </Col>);
        });
    }
    render() {
        const { data } = this.props;
        const rows = _.chunk(data, 3);
        const rowsRender = this.renderRows(rows);
        return (
            <Grid>
                {rowsRender}
            </Grid>
        );
    }
}
export default withRouter(ImageList);