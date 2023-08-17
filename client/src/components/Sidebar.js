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
            <Button onClick={() => downloadData()}> Export your data</Button>
            <label className="btn btn-primary">
                Import your data
                <input type="file" onChange={(event) => {
                    const file = event.target.files[0];
                    importData(file);
                }} style={{ display: 'none' }} />
            </label>
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


const PREFIX = 'Messaging-app'

function downloadData() {
    const data = exportLocalStorage([PREFIX + 'contacts', PREFIX + 'conversations', PREFIX + 'id'])
    console.log("Data" + data)
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = `${PREFIX}-${Date.now()}-backup.json`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportLocalStorage(keys) {
    const data = {};
    keys.forEach(key => {
        const jsonVal = localStorage.getItem(key);
        if (jsonVal != null) {
            if (jsonVal === "undefined") {
                data[key] = null;
            } else {
                data[key] = JSON.parse(jsonVal);
            }
        }
    });
    return JSON.stringify(data);
}

function importData(file, callback) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        Object.keys(data).forEach(key => {
            localStorage.setItem(key, JSON.stringify(data[key]));
        });
        if (callback) callback();
    };
    reader.readAsText(file);
}