import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./bootstrapSandStone.min.css"
import { useState,useEffect } from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homescreen from "./Screens/Homescreen";
import Productscreen from "./Screens/Productscreen";
import Cartscreen from "./Screens/Cartscreen";
import LoginScreen from "./Screens/Loginscreen";
import RegisterScreen from "./Screens/Registerscreen";
import ProfileScreen from "./Screens/Profilescreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import OrderListScreen from "./Screens/OrderListScreen";

function App() {
  const [products,setproducts] = useState(null)
  const [users,setusers] = useState(null)
  const [orders,setOrders] = useState(null)
 
  
  useEffect(() => {
    fetch("http://localhost:9999/products")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setproducts(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [products])

  useEffect(() => {
    fetch( "http://localhost:9999/users")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setusers(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [users])

  useEffect(() => {
    fetch( "http://localhost:8000/orders")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setOrders(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [orders])
  
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={products?<Homescreen products={products}/>:<h5>Loading..</h5>} exact />
            <Route path="/product/:id" element={products?<Productscreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/cart" element={products?<Cartscreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/login" element={products?<LoginScreen />:<h5>Loading..</h5>} />
            <Route path="/signup" element={products?<RegisterScreen props={products} users = {users} />:<h5>Loading..</h5>} />
            <Route path="/profile" element={products?<ProfileScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/productedit" element={products?<ProductEditScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/productlist" element={products?<ProductListScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/payment" element={products?<PaymentScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/shipping" element={products?<ShippingScreen props={products} />:<h5>Loading..</h5>} />
            <Route path='/order/:id' element={orders?<OrderScreen orders={orders} users={users}/>:<h5>Loading..</h5>} />
            <Route path="/placeorder" element={products?<PlaceOrderScreen props={products} />:<h5>Loading..</h5>} />
            <Route path='/orderlist' element={<OrderListScreen orders={orders}/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
