import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type SignState = {
    uploadedSign: string | null;
    uploadedFileSign: File | null;
    signModalValue: string | null;
    isSignText: boolean
    signPreviewState: boolean
}

const initialState: SignState = {
    uploadedSign: null,
    signModalValue: null,
    isSignText: false,
    signPreviewState: false,
    uploadedFileSign: null

}

export const signSlice = createSlice({
    name: 'signSlice',
    initialState,
    reducers: {
        setUploadedSign: (state, action: PayloadAction<string | null>) => {
            state.uploadedSign = action.payload
        },
        setUploadedFileSign: (state, action: PayloadAction<File | null>) => {
            state.uploadedFileSign = action.payload
        },
        setSignModalValue: (state, action: PayloadAction<string | null>) => {
            state.signModalValue = action.payload
        },

        setIsSignText: (state, action: PayloadAction<boolean>) => {
            state.isSignText = action.payload
        },

        setSignPreview: (state, action: PayloadAction<boolean>) => {
            state.signPreviewState = action.payload
        }
    },
})

export const { setUploadedSign, setSignModalValue, setIsSignText, setSignPreview, setUploadedFileSign } = signSlice.actions

export default signSlice.reducer

