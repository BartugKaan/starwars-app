import { View, Image, Text, StyleSheet, Pressable } from 'react-native'

export default function DataCard({
  item,
}: {
  item: { name: string; image: number }
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.dataCardContainerStyle,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.image} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.dataCardTextStyle}>{item.name}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  dataCardContainerStyle: {
    backgroundColor: '#d1cdcd',
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 8,
    padding: 10,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: 160,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    padding: 12,
    alignItems: 'center',
  },
  dataCardTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
})
