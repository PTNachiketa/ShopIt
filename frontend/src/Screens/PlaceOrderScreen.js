import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { cartAction } from "../store/store";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const userI = useSelector((state) => state.auth.token);
  const orderI = useSelector((state) => state.cart.order);
  const price = useSelector((state) => state.cart.Price);
  const tax = () => {
    return (price * 8) / 100;
  };
  const navigate = useNavigate();

  const updateOrders = async (order) => {
    await fetch("http://localhost:8000/orders", {
      method: "POST",
      body: JSON.stringify({
        orders: order,
        user_id: userI.id,
        isPaid: true,
        isDelivered: false,
      }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const placeOrderHandler = () => {
    const order = {
      orderItems: orderI.cart,
      shippingAddress: orderI.shippingAddress,
      paymentMethod: orderI.PaymentMethod,
      totalPrice: price + 100 + (price * 5) / 100,
    };
    dispatch(cartAction.createOrder(order));

    updateOrders(order);
    navigate("/profile");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {orderI.shippingAddress.address}, {orderI.shippingAddress.city}{" "}
                {orderI.shippingAddress.postalCode},{" "}
                {orderI.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {orderI.PaymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderI.cart.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderI.cart.map((item) => (
                    <ListGroup.Item key={item.id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{100}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{tax()}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{price + 100 + tax()}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* {error && <Message variant='danger'>{error}</Message>} */}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  // disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
