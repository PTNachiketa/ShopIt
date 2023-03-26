const order = require('../models/orderModel');

// Get all orders
async function getOrders(req, res) {
  try {
    const orders = await order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Create a new order
async function postOrder(req, res) {
  const { orders, user_id, isPaid, isDelivered, id } = req.body;

  const newOrder = new order({
    orders,
    user_id,
    isPaid,
    isDelivered,
    id
  });

  try {
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

//update Order
const updateOrder = async (req,res)=>{
  const orderId = req.params.id
  try {
    const orderU = await order.findById(orderId);

    if (!orderU) {
      console.log('Order not found');
      return;
    }

    orderU.isDelivered = true;
    await orderU.save();

    //console.log('Order updated successfully:', orderU);
  } catch (error) {
    console.error('Server error:', error);
  }

}

module.exports = { getOrders, postOrder,updateOrder};




