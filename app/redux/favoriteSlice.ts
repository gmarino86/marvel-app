import { createSlice } from '@reduxjs/toolkit'
import { Character } from '../interfaces/caracter.interface';

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        value: [] as Character[]
    },
    reducers: {
        add: (state, action) => {
            state.value.push(action.payload)
        },
        remove: (state, action) => {
            state.value = state.value.filter((item) => item.id !== action.payload.id)
        }
    }
})

export const { add, remove } = favoriteSlice.actions

export default favoriteSlice.reducer