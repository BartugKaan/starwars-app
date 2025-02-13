import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Character model for TypeScript
interface Character {
  id: number
  name: string
  image: string
}

// Redux State model
interface CharacterState {
  items: Character[] // List of characters
  status: 'idle' | 'loading' | 'succeeded' | 'failed' // Status of API request
  error: string | null // Error message in case of failure
}

// Initial state for the Redux slice
const initialState: CharacterState = {
  items: [],
  status: 'idle',
  error: null,
}

// Async function to fetch character data from API
export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_, { rejectWithValue }) => {
    try {
      console.log('API request initiated...')

      const response = await fetch(
        'https://akabab.github.io/starwars-api/api/all.json'
      )
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data: any[] = await response.json()

      // Transform API response into required format
      const characters: Character[] = data.map((char) => ({
        id: char.id,
        name: char.name,
        image: char.image,
      }))

      return characters
    } catch (error: any) {
      console.error('ERROR:', error.message)
      return rejectWithValue(error.message) // Send error message to Redux store
    }
  }
)

// Creating Redux slice for character state management
const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {}, // No synchronous reducers needed as we are using async thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading'
        state.error = null // Reset error if any previous error exists
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload // Store fetched characters in Redux
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string // Store error message in Redux
      })
  },
})

export default characterSlice.reducer
