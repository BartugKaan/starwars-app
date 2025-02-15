import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import {
  fetchCharacters,
  searchCharacters,
} from '../redux/slices/characterSlice'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    items: characters,
    searchResults,
    status,
    searchStatus,
    error,
    searchError,
    currentPage,
    hasMore,
  } = useSelector((state: RootState) => state.characters)

  // State for storing the search query
  const [query, setQuery] = useState('')

  // Fetch the first page of characters when the app starts
  useEffect(() => {
    if (characters.length === 0) {
      dispatch(fetchCharacters(1))
    }
  }, [dispatch])

  // Fetch characters from the API when the user searches for a name
  useEffect(() => {
    if (query.length > 0) {
      dispatch(searchCharacters(query))
    }
  }, [query, dispatch])

  // Determine which list to display: search results or full list
  const displayedCharacters = query.length > 0 ? searchResults : characters

  // "Load More" button should only work when the user is not searching
  const handleLoadMore = () => {
    if (hasMore && query.length === 0) {
      dispatch(fetchCharacters(currentPage))
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>
        {/* Search Input Field */}
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
          placeholder="Search characters..."
          value={query}
          onChangeText={(text) => setQuery(text)}
        />

        {/* Show loading indicator when fetching data */}
        {(searchStatus === 'loading' && query.length > 0) ||
        (status === 'loading' && query.length === 0) ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (query.length > 0 && searchError) ||
          (query.length === 0 && error) ? (
          <Text style={{ fontSize: 18, color: 'red' }}>
            {query.length > 0 ? searchError : error}
          </Text>
        ) : (
          <FlatList
            data={displayedCharacters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CharacterItem character={item} />}
          />
        )}

        {/* "Load More" button should be visible only when searching is not active */}
        {hasMore && query.length === 0 && (
          <TouchableOpacity
            onPress={handleLoadMore}
            style={{
              backgroundColor: '#0000ff',
              padding: 10,
              alignItems: 'center',
              margin: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>
    </GestureHandlerRootView>
  )
}

// Component for displaying a character item
const CharacterItem = ({
  character,
}: {
  character: { id: number; name: string; image: string }
}) => {
  return (
    <View style={{ padding: 10, alignItems: 'center' }}>
      <Image
        source={{ uri: character.image }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
        {character.name}
      </Text>
    </View>
  )
}
