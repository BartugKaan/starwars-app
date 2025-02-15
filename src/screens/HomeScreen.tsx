import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import { fetchCharacters } from '../redux/slices/characterSlice'

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>() // Dispatch function to trigger Redux actions
  const {
    items: characters,
    status,
    error,
    currentPage,
    hasMore,
  } = useSelector((state: RootState) => state.characters) // Access Redux state

  const [isImageLoading, setIsImageLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchCharacters(1)) // Fetch data when the component mounts
  }, [dispatch])

  const handleLoadMore = () => {
    if (hasMore) {
      const nextPage = currentPage + 1
      dispatch(fetchCharacters(nextPage))
    }
  }

  // Show loading indicator while data is being fetched
  if (status === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  // Display an error message if API call fails
  if (status === 'failed') {
    console.log('Redux Error:', error)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'red' }}>{error}</Text>
      </View>
    )
  }

  // Display the character list using FlatList
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              backgroundColor: 'gray',
              margin: 10,
              borderRadius: 25,
            }}
          >
            {isImageLoading && (
              <ActivityIndicator size="small" color="#0000ff" />
            )}
            <Image
              source={{ uri: item.image }}
              style={{
                width: 200,
                height: 300,
                borderRadius: 15,
                paddingBottom: 15,
              }}
              onLoad={() => setIsImageLoading(false)}
            />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {item.name}
            </Text>
          </View>
        )}
      />
      {hasMore && (
        <TouchableOpacity
          onPress={handleLoadMore}
          style={{
            backgroundColor: '#0000ff',
            padding: 10,
            alignItems: 'center',
            margin: 10,
            borderRadius: 5,
            marginBottom: 30,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}> Load More</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
