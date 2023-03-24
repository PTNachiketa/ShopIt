import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col , Alert  } from 'react-bootstrap'
import { useDispatch} from 'react-redux'
import { authAction } from '../store/store'
import FormContainer from '../components/FormContainer'



const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users,setusers] = useState(null)
  const [alert,setAlert] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    fetch( "http://localhost:8000/users")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setusers(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
 
    users.map((user)=>{
      
        if ((user.email==email)&&(user.password==password)) {
          dispatch(authAction.login(user))
          if(user.Token=="Admin1001"){
            dispatch(authAction.setAdmin())
          }
          
          console.log("logged in")
          setAlert(true)
        }
      
    })


  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {alert&&<Alert variant='success' >
           logged in
        </Alert>}
        
      <Form onSubmit={submitHandler} autoComplete='off'>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='btn btn-dark '>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to='/signup'>
            SignUp
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen