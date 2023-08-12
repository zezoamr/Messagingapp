import React from 'react'
import { useContacts } from '../contexts/ContactsProvider'
import { ListGroup} from 'react-bootstrap'

export default function Contacts() {

  const {contacts, setContactName} = useContacts()

  return (
    <ListGroup variant="flush">
      {contacts.map(contact => (
        <ListGroup.Item 
          key={contact.id}
          action
          onClick={() => {
            const newValue = window.prompt('Enter new contact name:')
            if (newValue) {
              setContactName(contact.id, newValue)
            }
          }}
          >
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}