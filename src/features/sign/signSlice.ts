import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type SignState = {
    uploadedSign: string | null;
    signModalValue: string | null;
    isSignText: boolean
}

const initialState: SignState = {
    uploadedSign: null,
    signModalValue: null,
    isSignText: false
}

export const signSlice = createSlice({
    name: 'signSlice',
    initialState,
    reducers: {
        setUploadedSign: (state, action: PayloadAction<string | null>) => {
            state.uploadedSign = action.payload
        },

        setSignModalValue: (state, action: PayloadAction<string | null>) => {
            state.signModalValue = action.payload
        },

        setIsSignText: (state, action: PayloadAction<boolean>) => {
            state.isSignText = action.payload
        }
    },
})

export const { setUploadedSign, setSignModalValue, setIsSignText } = signSlice.actions

export default signSlice.reducer

