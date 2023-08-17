import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function Conversations() {
  const { conversations, setSelectedConversationIndex, setCurrentlySelectingConversations } = useConversations()

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => {
            setSelectedConversationIndex(index)
            setCurrentlySelectingConversations(true)
          }}
          active={conversation.selected}
        >
          {conversation.recipients.map(r => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}