import React, { useContext } from 'react'
import useLocalStorage from '../hooks/LocalStorage'

const ContactsContext = React.createContext()

export function useContacts(){
    return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
    const [contacts, setContacts] = useLocalStorage('contacts', [])
    function createContact(id, name){
        setContacts((prevContacts)=>{
            return [...prevContacts, {id, name}]
        })
    }
    function setContactName(id, name){
        setContacts((prevContacts)=>{
            return prevContacts.map((contact) => {
                if(contact.id === id) {
                    return { id, name }
                } else {
                    return contact
                }
            })
        })
    }

  return (
    <ContactsContext.Provider value={{contacts, createContact, setContactName}}>
        {children}
    </ContactsContext.Provider>
  )
}