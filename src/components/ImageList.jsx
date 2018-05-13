import React from 'react';
import ReactDOM from 'react-dom';
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
        console.log("Image Click: ", id);
        console.log("Image Click url: ", this.props.history, this.props.location);
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
            console.log("Col", column);
            const { id, imageData } = column;
            const image = `data:image/jpeg;base64,${imageData}`;
            return (
                <Col key={index} xs={6} md={3}>
                    <Thumbnail href="#" alt="171x180" src={image} onClick={() => this.handleImageClick(id)} />
                </Col>);
        });
    }
    render() {
        console.log("List");
        const { data } = this.props;
        //const data = [1, 2, 3, 4, 5];
        const rows = _.chunk(data, 3);
        const rowsRender = this.renderRows(rows);
        console.log(rowsRender);
        return (
            <Grid>
                {rowsRender}
            </Grid>
        );
    }
}
export default withRouter(ImageList);