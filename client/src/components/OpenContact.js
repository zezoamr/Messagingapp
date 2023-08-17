import React from 'react'
import { useContacts } from '../contexts/ContactsProvider'
import { Card, ListGroup } from 'react-bootstrap'

function OpenContact() {
    const { currentlySelectedContact, contacts } = useContacts()
    const contact = contacts.filter(c => c.id === currentlySelectedContact)[0]

  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1 overflow-auto" style={{ height: '100vh'}}>
        {contact ? 
            <Card style={{ width: '18rem'}}>
                <Card.Header style={{ backgroundColor: '#17a2b8' }}>Contact Info</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>id: {contact.id}</ListGroup.Item>
                    <ListGroup.Item>name: {contact.name}</ListGroup.Item>
                    <ListGroup.Item className="text-muted small"> DoubleClick on the contact in the left tab to change the name</ListGroup.Item>
                </ListGroup>
            </Card>
            : 
            <div>contact not found</div>
        }
    </div>
  )
}

export default OpenContact
