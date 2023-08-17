import React from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import { useConversations } from '../contexts/ConversationsProvider'
import { useContacts } from '../contexts/ContactsProvider'
import OpenContact from './OpenContact'

function Dashboard({id}) {
  const { currentSelectedConversation, currentlySelectingConversations} = useConversations()
  const { currentlySelectedContact } = useContacts()
  
  return (
    <div style={{height: '100vh'}} className='d-flex'>
        <Sidebar id={id}/>
        {currentlySelectingConversations && currentSelectedConversation && <OpenConversation/>}
        {!currentlySelectingConversations && (currentlySelectedContact !== '') && <OpenContact/>}
    </div>
    
  )
}

export default Dashboard