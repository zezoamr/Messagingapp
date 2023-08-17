import React from 'react'
import { useContacts } from '../contexts/ContactsProvider'
import { ListGroup} from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function Contacts() {

  const {contacts, setContactName, setCurrentlySelectedContact} = useContacts()
  const { setCurrentlySelectingConversations } = useConversations()

  return (
    <ListGroup variant="flush">
      {contacts.map(contact => (
        <ListGroup.Item 
          key={contact.id}
          action
          onDoubleClick={() => {
            const newValue = window.prompt('Enter new contact name:')
            if (newValue) {
              setContactName(contact.id, newValue)
            }
          }}
          onClick={()=>{
              setCurrentlySelectedContact(contact.id)
              setCurrentlySelectingConversations(false)
              //console.log("currentlySelectedContact " + currentlySelectedContact)
            }}
          >
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}