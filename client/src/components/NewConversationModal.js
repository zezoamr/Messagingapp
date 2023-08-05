import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  function handleCheckboxChange(contactId) {
    setSelectedContactIds(prevSelectedContactIds => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter(prevId => {
          return contactId !== prevId
        })
      } else {
        return [...prevSelectedContactIds, contactId]
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    createConversation(selectedContactIds)
    closeModal()
  }

  return (
    <>
        <Modal.Header closeButton> Create New Conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {contacts.map(contact => (
                <Form.Group controlId={contact.id} key={contact.id}>
                  <Form.Check
                    type='checkbox'
                    value={selectedContactIds.includes(contact.id)}
                    label={contact.name}
                    onChange={() => handleCheckboxChange(contact.id)}
                  />
                </Form.Group>
              ))}
              <Button type='submit'> Create </Button>
            </Form>
        </Modal.Body>
    </>
  )
}

export default NewConversationModal