import { configureStore } from '@reduxjs/toolkit'
import handleAuthReducer from './slices/userauth.js'

export const Store = configureStore({
    reducer :{
        handleauthreducer : handleAuthReducer
    }
})