import { combineReducers } from "redux"
import { createReducer } from '@reduxjs/toolkit'
import actions from './phonebook-actions'
// import types from './phonebook-types'


const items = createReducer([], {
    [actions.addContact]: (state, { payload }) => [...state, payload],
    [actions.deleteContacts]: (state, { payload }) =>state.filter(({id})=> id !== payload),
})


// const items = (state = [], { type, payload }) => {
    
//     switch (type) {
//         case types.ADD:
//             return [...state, payload];
//         case types.DELETE:
//             return state.filter(({id})=> id !== payload)
//         default:
//             return state;
//     }
// }

const filters = createReducer('', {
    [actions.filterContacts]:(_, { payload })=>payload
})

// const filters = (state = '', { type, payload }) => {
//     switch (type) {
//         case types.FILTERS:
//             return  payload;
        
//         default:
//             return state;
//     }
// }

export default combineReducers({
    items,
    filters
})