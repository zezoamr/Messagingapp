import React from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import { useConversations } from '../contexts/ConversationsProvider'

function Dashboard({id}) {
  const { currentSelectedConversation } = useConversations()
  return (
    <div style={{height: '100vh'}} className='d-flex'>
        <Sidebar id={id}/>
        {currentSelectedConversation && <OpenConversation/>}
    </div>
    
  )
}

export default Dashboard