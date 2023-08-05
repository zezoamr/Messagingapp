import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'



function Sidebar({id}) {
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const [modalOpen, setmodalOpen] = useState(false)
    const conversationsOpen = (activeKey === CONVERSATIONS_KEY)
    function closeModal(){
        setmodalOpen(false)
    }
  return (
    <div style={{width: '250px'}} className='d-flex flex-column'>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            <Nav variant='tabs' className='justify-content center'>
                <Nav.Item>
                    <Nav.Link eventKey={CONVERSATIONS_KEY}>conversations</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={CONTACTS_KEY}>contacts</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content className="border-end overflow-auto flex-grow-1">
                <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                    <Conversations/>
                </Tab.Pane>
                <Tab.Pane eventKey={CONTACTS_KEY}>
                    <Contacts/>
                </Tab.Pane>
            </Tab.Content>
            <div className='p-2 border-end border-top small'>
            Your Id: <span className='text-muted'> {id} </span>
            </div>
            <Button onClick={() => setmodalOpen(true)}> New {conversationsOpen? 'Conversation' : 'Contact'} </Button>
        </Tab.Container>
        <Modal show={modalOpen} onHide={closeModal}>
            { conversationsOpen ?
            <NewConversationModal closeModal={closeModal}/> :
            <NewContactModal closeModal={closeModal}/>
            }
        </Modal>
    </div>
  )
}

export default Sidebar