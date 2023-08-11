import React, { useState, useCallback } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

function OpenConversation() {
    const [text, setText] = useState('')
    const { sendMessage, currentSelectedConversation } = useConversations()
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        sendMessage(
            currentSelectedConversation.recipients.map(r => r.id),
            text
          )
        setText('')
    }

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>
                <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                    {currentSelectedConversation.messages.map((message, index) => {
                        const lastMessage = currentSelectedConversation.messages.length - 1 === index
                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className={`d-flex flex-column my-1  ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div
                                    className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.text}
                                    {/*message.fromMe? ' from me': ' not me'*/}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-end' : ''}`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: '75px', resize: 'none' }}
                        />
                        <Button type="submit"> Send </Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation