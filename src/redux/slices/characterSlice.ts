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
  currentPage: number // Track the current Page
  hasMore: boolean // Indicates if there are more pages to load
}

// Initial state for the Redux slice
const initialState: CharacterState = {
  items: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  hasMore: true,
}

// Async function to fetch character data from API
export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page: number, { rejectWithValue }) => {
    try {
      console.log(`Fetching characters from page ${page}...`)

      const response = await fetch(
        `https://starwars-databank-server.vercel.app/api/v1/characters?page=${page}`
      )

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()

      const characters: Character[] = data.data.map((char: any) => ({
        id: char._id,
        name: char.name,
        image: char.image,
      }))

      return { characters, hasMore: data.info.next !== null }
    } catch (error: any) {
      console.error('ERROR:', error.message)
      return rejectWithValue(error.message)
    }
  }
)

// Creating Redux slice for character state management
const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    resetCharacters: (state) => {
      state.items = []
      state.currentPage += 1
      state.hasMore = true
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading'
        state.error = null // Reset error if any previous error exists
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = [...state.items, ...action.payload.characters]
        state.hasMore = action.payload.hasMore
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string // Store error message in Redux
      })
  },
})

export const { resetCharacters } = characterSlice.actions
export default characterSlice.reducer
