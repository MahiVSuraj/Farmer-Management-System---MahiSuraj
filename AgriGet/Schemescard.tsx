import React from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native';

export default function SchemeCard({ item }) {
  const { height, width } = useWindowDimensions();

  // Determine the flag based on the 'type' property of the scheme
  const schemeFlag = item.loan_type === 'gr' ? 'Grant' : 'Repayable'; // Adjust based on your data model

  return (
    <View style={[styles.card, { width: width * 0.9, padding: height * 0.02 }]}>
      <Image
        source={{
          uri: item.image
            ? `http://127.0.0.1:8000${item.image}`
            : 'https://via.placeholder.com/150',
        }}
        style={[styles.image, { height: height * 0.2 }]}
        resizeMode="cover"
      />
      <Text style={[styles.title, { fontSize: height * 0.025 }]}>{item.name}</Text>
      <Text style={[styles.description, { fontSize: height * 0.018 }]}>
        {item.description}
      </Text>
      <Text
        style={[
          styles.status,
          { fontSize: height * 0.02, color: item.status ? 'green' : 'red' },
        ]}
      >
        {item.status === true ? 'Eligible' : 'Not Eligible'}
      </Text>

      {/* Add the flag for Grant or Repayable */}
      <View style={styles.flagContainer}>
        <Text style={styles.flagText}>{schemeFlag}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF8DC',
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#555',
    marginBottom: 10,
  },
  status: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  flagContainer: {
    backgroundColor: '#4CAF50', // Green background for visibility
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  flagText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
