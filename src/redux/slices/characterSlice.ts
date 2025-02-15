import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Character model for TypeScript
interface Character {
  id: number
  name: string
  image: string
}

// Redux State model
interface CharacterState {
  items: Character[] // All characters from API
  searchResults: Character[] // Filtered characters for search
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  searchStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  currentPage: number
  searchError: string | null
  hasMore: boolean
  searchQuery: string // New search state
}

// Initial state for the Redux slice
const initialState: CharacterState = {
  items: [],
  searchResults: [],
  status: 'idle',
  searchStatus: 'idle',
  error: null,
  searchError: null,
  currentPage: 1,
  hasMore: true,
  searchQuery: '',
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

      return {
        characters,
        hasMore: data.info.next !== null,
        nextPage: page + 1,
      }
    } catch (error: any) {
      console.error('ERROR:', error.message)
      return rejectWithValue(error.message)
    }
  }
)

export const searchCharacters = createAsyncThunk(
  'characters/searchCharacters',
  async (name: string, { rejectWithValue }) => {
    try {
      console.log(`Searching character: ${name}`)

      const response = await fetch(
        `https://starwars-databank-server.vercel.app/api/v1/characters/name/${name}`
      )

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()

      // Debugging: Log the API response to understand its structure
      console.log('API Response:', JSON.stringify(data, null, 2))

      // Ensure the API response contains the expected structure
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid API response: Expected an array.')
      }

      const characters: Character[] = data.map((char: any) => ({
        id: char._id,
        name: char.name,
        image: char.image,
      }))

      return characters
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
      state.searchResults = []
      state.currentPage = 1
      state.hasMore = true
      state.status = 'idle'
      state.searchStatus = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Characters (Pagination)
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = [...state.items, ...action.payload.characters]
        state.hasMore = action.payload.hasMore
        state.currentPage = action.payload.nextPage
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })

      // ✅ Search Characters
      .addCase(searchCharacters.pending, (state) => {
        state.searchStatus = 'loading'
        state.searchError = null
      })
      .addCase(searchCharacters.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded'
        state.searchResults = action.payload
      })
      .addCase(searchCharacters.rejected, (state, action) => {
        state.searchStatus = 'failed'
        state.searchError = action.payload as string
      })
  },
})

export const { resetCharacters } = characterSlice.actions
export default characterSlice.reducer
