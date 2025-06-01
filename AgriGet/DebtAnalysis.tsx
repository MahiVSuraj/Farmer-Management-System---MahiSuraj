import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import debtData from './debtData.json';
const DebtAnalysis = ({...debtData}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Debt Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debt Summary</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Total Debt:</Text>
          <Text style={styles.value}>₹{debtData.totalDebt}</Text>
          <Text style={styles.label}>Monthly Repayment:</Text>
          <Text style={styles.value}>₹{debtData.monthlyRepayment}</Text>
          <Text style={styles.label}>Interest Rate:</Text>
          <Text style={styles.value}>{debtData.interestRate}%</Text>
        </View>
      </View>

      {/* Insights Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Analysis Insights</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Debt-to-Income Ratio:</Text>
          <Text style={styles.value}>{debtData.debtToIncomeRatio}%</Text>
          <Text style={styles.label}>Repayment Status:</Text>
          <Text style={styles.value}>{debtData.repaymentStatus}</Text>
        </View>
      </View>

      {/* Recommendations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <View style={styles.card}>
          <Text style={styles.value}>{debtData.recommendations}</Text>
        </View>
      </View>

      {/* Subsidy and Schemes Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Applicable Subsidies and Schemes</Text>
        <FlatList
          data={schemes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.schemeCard}>
              <Text style={styles.schemeTitle}>{item.name}</Text>
              <Text style={styles.schemeDetails}>{item.details}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  schemeCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 3,
  },
  schemeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  schemeDetails: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default DebtAnalysis;
