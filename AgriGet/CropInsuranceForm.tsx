// CropInsuranceForm.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const CropInsuranceForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    farmerName: '',
    cropType: '',
    area: '',
    insuredAmount: '',
    premium: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = () => {
    const { farmerName, cropType, area, insuredAmount, premium } = formData;

    if (!farmerName || !cropType || !area || !insuredAmount || !premium) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    Alert.alert('Success', 'Insurance form submitted successfully!');
    navigation.navigate('Premium', { ...formData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crop Insurance Form</Text>

      <Text style={styles.label}>Farmer Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter farmer name"
        value={formData.farmerName}
        onChangeText={(text) => handleInputChange('farmerName', text)}
      />

      <Text style={styles.label}>Crop Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter crop type"
        value={formData.cropType}
        onChangeText={(text) => handleInputChange('cropType', text)}
      />

      <Text style={styles.label}>Area (in acres)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter area"
        value={formData.area}
        keyboardType="numeric"
        onChangeText={(text) => handleInputChange('area', text)}
      />

      <Text style={styles.label}>Insured Amount (₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter insured amount"
        value={formData.insuredAmount}
        keyboardType="numeric"
        onChangeText={(text) => handleInputChange('insuredAmount', text)}
      />

      <Text style={styles.label}>Premium (₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter premium amount"
        value={formData.premium}
        keyboardType="numeric"
        onChangeText={(text) => handleInputChange('premium', text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#40916c',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#40916c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CropInsuranceForm;