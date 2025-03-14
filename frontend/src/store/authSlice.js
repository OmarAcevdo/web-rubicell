import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    data: {},
    auth: {
        isAuth: false,
        isAdmin: false,
        user: undefined
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        verificarAuth: (state, action) => {
           const {isAdmin, user} = action.payload
           state.auth.isAuth = true
           state.auth.isAdmin = isAdmin
           state.auth.user = user 
        },
        logout: (state, action) => {
           state.auth.isAuth = false
           state.auth.isAdmin = false
           state.auth.user = undefined
        }
    }
})


export const {verificarAuth, logout} = authSlice.actions
export const getAuth = (state) => state.auth.auth

export default authSlice.reducer