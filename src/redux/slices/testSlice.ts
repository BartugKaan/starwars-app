import { createSlice } from '@reduxjs/toolkit'

const testSlice = createSlice({
  name: 'test',
  initialState: { message: 'Redux Works' },
  reducers: {},
})

export default testSlice.reducer
