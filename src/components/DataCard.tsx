import { View, Image, Text, StyleSheet } from 'react-native'

export default function DataCard({
  item,
}: {
  item: { name: string; image: number }
}) {
  return (
    <View style={styles.dataCardContainerStyle}>
      <Image
        style={{
          width: 150,
          height: 250,
          borderRadius: 15,
          marginBottom: 5,
        }}
        source={item.image}
      ></Image>
      <Text style={styles.dataCardTextStyle}>{item.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  dataCardContainerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 15,
    height: 300,
    width: 'auto',
    padding: 15,
    borderRadius: 10,
  },
  dataCardTextStyle: {
    fontSize: 16,
    margin: 3,
    fontWeight: '600',
  },
})
