import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

function OpenConversation() {
    const [text, setText] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        setText('')
    }

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>
                OpenConversation
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