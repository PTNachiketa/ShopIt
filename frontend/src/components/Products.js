import React from "react";
import { Card } from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from '../components/Rating';

const Products = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link id="GFG" to={`/product/${product.id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
         <Rating value={product.rating} numReviews = {product.numReviews} />
        </Card.Text>

        <Card.Text as="h3">Rs.{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Products;
