import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import moment from 'moment';
import { deleteProduct } from '../../actions/products';

const shortDateFormat = 'MM/DD/YYYY';
const longDateFormat = 'MM/DD/YYYY hh:mm a';

const Product = ({ product, dispatch }) => {
  const receiptDate =  product.receiptDate ? moment(product.receiptDate).format(shortDateFormat) : '-';
  const expirationDate =  product.expirationDate ? moment(product.expirationDate).format(shortDateFormat) : '-';
  const createdAt = product.createdAt ? moment(product.createdAt).format(longDateFormat) : '-';

  return (
    <Card>
      <CardBody>
        <CardTitle>{product.name}</CardTitle>
        <CardText tag="div">
          <ListGroup>
            <ListGroupItem>Brand: {product.brand}</ListGroupItem>
            <ListGroupItem>Rating: {product.rating}</ListGroupItem>
            <ListGroupItem>Featured: {product.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {product.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map(category => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {receiptDate}</ListGroupItem>
            <ListGroupItem>Expiration Date: {expirationDate}</ListGroupItem>
            <ListGroupItem>Created At: {createdAt}</ListGroupItem>
          </ListGroup>
        </CardText>
        <Button 
          onClick={() => dispatch(deleteProduct(product.id))}
          color='danger'>
          Delete
        </Button>
      </CardBody>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Product);
