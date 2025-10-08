import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type DocState = {
    uploadedDoc: File | null;
    previewState: boolean
    downloadState: boolean
}

const initialState: DocState = {
    uploadedDoc: null,
    previewState: false,
    downloadState: false

}

export const docSlice = createSlice({
    name: 'docSlice',
    initialState,
    reducers: {
        setDocs: (state, action: PayloadAction<File | null>) => {
            state.uploadedDoc = action.payload
        },
        setPreviewState: (state, action: PayloadAction<boolean>) => {
            state.previewState = action.payload
        },
        setDownloadState: (state, action: PayloadAction<boolean>) => {
            state.downloadState = action.payload
        },
    },
})

export const { setDocs, setPreviewState,setDownloadState } = docSlice.actions

export default docSlice.reducer



// const initialState: DocState = {
//     uploadedDoc: loadFromStorage('uploadedDoc') || null,
//     previewState: loadFromStorage('previewState') || false,
// }

// saveToStorage('uploadedDoc', action.payload, 5 * 60 * 1000); // 5 mi
