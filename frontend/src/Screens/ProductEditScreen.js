import React, { useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const ProductEditScreen = () => {
  
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error,setError] = useState(null)
  const [products,setProducts] = useState(null)


  useEffect(() => {
    fetch("http://localhost:9999/products")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setProducts(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [])



  const submitHandler = async (e) => {
    e.preventDefault()
  
    
      const product = {
        "id":products.length +1,
        "name": name,
        "image": image,
        "description": description,
        "brand": brand,
        "category": category,
        "price": price,
        "countInStock": countInStock,
        "rating": 4,
        "numReviews": 10
      }
 
     try {
      const response = await fetch("http://localhost:9999/products",{
        method : 'POST',
        body : JSON.stringify(product),
        headers : {'Content-Type' : 'application/json'}
       })
       const json = await response.json()
       if(response.ok){
        setMessage("Product Added Successfully")

       }
       if(!response.ok){
        setError(true)  
        setMessage(json.msg)
       }
       
     } catch (error) {
      console.log(error)
     
     }
    
    
  
}

  return (
    <>
    
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
    
       
        <FormContainer>
      <h1>Create Products</h1>
      {message && <Message variant='success'>{message}</Message>}
      {error && <Message variant='danger'>{message}</Message>}
      <Form onSubmit={submitHandler} autoComplete="off" encType="multipart/form-data" >
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Product name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='brand'>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type='brand'
            placeholder='Brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='countInStock'>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type='number'
            placeholder='countInStock'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Descritption</Form.Label>
          <Form.Control
            type='description'
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='image'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        
        <Form.Group className='mb-3' controlId='imageUpload'>
        <Form.Label>Upload Image</Form.Label>
        <input type="File" name="image"/>
        </Form.Group>


        <Form.Group className='mb-3' controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='category'
            placeholder='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>


        <Button type='submit' variant='primary'>
          Add
        </Button>
      </Form>

    </FormContainer>
      
    </>
  )
}

export default ProductEditScreen