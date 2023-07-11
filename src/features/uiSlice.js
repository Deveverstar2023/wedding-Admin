import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarShow = !state.sidebarShow
    },
  },
})

export const { toggleSidebar } = uiSlice.actions
export default uiSlice.reducer