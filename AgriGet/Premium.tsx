// Premium.tsx
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

interface PremiumData {
  coverage: number;
  premiumRate: number;
  totalPremium: number;
}

interface FormData {
  name: string;
  mobileNumber: string;
  age: string;
  gender: string;
  caste: string;
  cropType: string;
  Area: string;
  MarketPrice: string;
}

interface PremiumScreenProps {
  route: {
    params: {
      premiumData: PremiumData;
      formData: FormData;
    };
  };
}

const PremiumScreen: React.FC<PremiumScreenProps> = ({ route }) => {
  const { premiumData, formData } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Premium Calculation</Text>
      <Text style={styles.label}>Name: {formData.name}</Text>
      <Text style={styles.label}>Mobile Number: {formData.mobileNumber}</Text>
      <Text style={styles.label}>Crop Type: {formData.cropType}</Text>
      <Text style={styles.label}>Area: {formData.Area} Hectares</Text>
      <Text style={styles.label}>Market Price: ₹{formData.MarketPrice} per Hectare</Text>

      <Text style={styles.title}>Premium Details</Text>
      <Text style={styles.label}>Coverage: ₹{premiumData.coverage.toFixed(2)}</Text>
      <Text style={styles.label}>Premium Rate: {(premiumData.premiumRate * 100).toFixed(2)}%</Text>
      <Text style={styles.label}>Total Premium: ₹{premiumData.totalPremium.toFixed(2)}</Text>
    </SafeAreaView>
  );
};

export default PremiumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
});
