import shortid from 'shortid'
import { createAction } from '@reduxjs/toolkit'


const addContact = createAction('phonebook/add', (name, number) => ({
    payload: {
        id: shortid.generate(),
        name,
        number,
    }
})  );
const deleteContacts = createAction('phonebook/delete')
const filterContacts = createAction('phonebook/filter')

// const addContact = (name, number) => ({
//     type: types.ADD,
//     payload: {
//         id: shortid.generate(),
//       name,
//       number,
//     }
// })

// const deleteContacts = (contactId) => ({
//     type: types.DELETE,
//     payload: contactId
// })

// const filterContacts = (value) => ({
//     type: types.FILTERS,
//         payload: value
    
// })

export default { addContact, deleteContacts, filterContacts };