import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { View, Text } from 'react-native'

export default function HomeScreen() {
  const message = useSelector((state: RootState) => state.test.message)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{message}</Text>
    </View>
  )
}
