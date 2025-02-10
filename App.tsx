import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'

type RootStackParamList = {
  Home: undefined
  Details: { id: number }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>

//Navigator Test Content
const HomeScreen = ({ navigation }: HomeScreenProps) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Screen</Text>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details', { id: 42 })}
    ></Button>
  </View>
)

const DetailScreen = ({ route }: DetailsScreenProps) => {
  const { id } = route.params
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recieved id: {id}</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
