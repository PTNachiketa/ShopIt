import React, { useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import './Registerscreen.css'


const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [token , setToken] = useState('')
  const [message, setMessage] = useState(null)
  const [alert,setAlert] = useState(null)
  const navigate = useNavigate();



  const submitHandler = async (e) => {
    e.preventDefault()
    
      const user = {
        "name" : name,
        "email" : email,
        "password" : password,
        "Token" : token
      }
 
     const msg = await fetch("http://localhost:8000/users",{
       method : 'POST',
       body : JSON.stringify(user),
       headers : {'Content-Type' : 'application/json'}
      })
    navigate("/login")
    
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      <Form onSubmit={submitHandler} autoComplete='off'>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {(name ==='' || name.length < 7) ?<Message className ="message" variant = 'danger'> Name should consists of minmum 7 characters </Message>:<Message className="message-success"variant = 'success'>Perfect</Message>}
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {email ==='' || !email.includes('@gmail.com') ? <Message className ="message" variant = 'danger'>Invalid Email </Message> :<Message className="message-success" variant = 'success'>Perfect</Message>}
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {password.length< 8 ? <Message className ="message"variant = 'danger'>Password should be {'>'}8 characters</Message> :<Message className="message-success" variant = 'success'>Perfect</Message>}
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {confirmPassword !== password && confirmPassword !== '' ? <Message className ="message" variant = 'danger'>confirm password should be same as password</Message> :<Message  className="message-success" variant = 'success'>Perfect</Message>}
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>AdminToken</Form.Label>
          <Form.Control
            type='Token'
            placeholder='Enter Token'
            value={token}
            onChange={(e) => setToken(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to='/login'>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen