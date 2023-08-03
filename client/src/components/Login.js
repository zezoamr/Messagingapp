import React, { useRef } from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';

function Login({onIdSubmit}) {

    const idRef = useRef()
    function handleSubmit(e) {
        e.preventDefault()
        onIdSubmit(idRef.current.value)
    }
    function createNewId() {
        return onIdSubmit(uuidv4())
    }
  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>
        <Form className='w-100' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Enter your id</Form.Label>
                <Form.Control type='text' ref={idRef} required />
            </Form.Group>
            <Button type='submit' className='me-2'>Login</Button>
            <Button variant='secondary' onClick={createNewId} >Create a New Id</Button>
        </Form>
    </Container>
  )
}

export default Login