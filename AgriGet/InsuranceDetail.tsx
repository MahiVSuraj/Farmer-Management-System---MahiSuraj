// InsuranceDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const InsuranceDetail = ({ route }) => {
  const { policy, premium, expiry, damageCoverage } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Policy Details</Text>
        <Text style={styles.detailText}>Policy: {policy}</Text>
        <Text style={styles.detailText}>Premium: {premium}</Text>
        <Text style={styles.detailText}>Expiry: {expiry}</Text>
        <Text style={styles.detailText}>Damage Coverage: {damageCoverage}</Text>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  detailContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default InsuranceDetail;
