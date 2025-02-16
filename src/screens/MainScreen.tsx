import { useState } from 'react'
import { Image, StyleSheet, View, Text, FlatList } from 'react-native'
import DataCard from '../components/DataCard'

export default function MainScreen() {
  const dataModel = [
    { name: 'Characters', image: require('../assets/charactersImage.jpeg') },
    { name: 'Creatures', image: require('../assets/creaturesImage.jpeg') },
    { name: 'Droids', image: require('../assets/droidsImage.jpg') },
    { name: 'Locaions', image: require('../assets/locationsImage.jpg') },
    {
      name: 'Organizations',
      image: require('../assets/organizationsImage.jpg'),
    },
    { name: 'Species', image: require('../assets/speciesImage.jpg') },
    { name: 'Vehicles', image: require('../assets/vehiclesImage.jpeg') },
  ]

  const renderItem = ({ item }: { item: { name: string; image: number } }) => (
    <DataCard item={item} />
  )

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.bannerStyle}
        source={require('../assets/banner.jpg')}
      ></Image>
      <Text style={styles.dataTitleTextStyle}>All Star Wars Data</Text>
      <FlatList
        data={dataModel}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bannerStyle: {
    width: 'auto',
    height: 250,
    margin: 10,
    marginHorizontal: 15,
    borderRadius: 25,
  },
  dataTitleTextStyle: {
    fontSize: 24,
    fontWeight: '600',
    marginHorizontal: 15,
    marginTop: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
})
