import React, { useContext, useState, useCallback, useEffect } from 'react'
import useLocalStorage from '../hooks/LocalStorage'
import { useContacts } from '../contexts/ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}

function arrayEquality(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    a = a.slice().sort();
    b = b.slice().sort();

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function ConversationsProvider({ id, children }) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const { contacts } = useContacts()
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const socket = useSocket()


    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
        
        setConversations(prevConversations => {
            let madeChange = false
            const newMessage = { sender, text }
            
            const newConversations = prevConversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }

                return conversation
            })

            if (madeChange) {
                return newConversations
            } else {
                return [
                    ...prevConversations,
                    { recipients, messages: [newMessage] }
                ]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if (socket == null) return
    
        socket.on('receive-message', addMessageToConversation)
    
        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])

    function sendMessage( recipients, text ) {
        socket.emit('send-message', {recipients, text})
        addMessageToConversation({ recipients, text, sender: id })
    }

    const formattedConversations = conversations.map((conversation, index) => {
        
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            console.log(fromMe," ", id," ",  message.sender)
            return { ...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversationIndex
        return { ...conversation, messages, recipients, selected }
    })

    const value = {
        conversations: formattedConversations,
        setSelectedConversationIndex,
        currentSelectedConversation: formattedConversations[selectedConversationIndex],
        createConversation,
        sendMessage
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}