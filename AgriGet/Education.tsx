import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Education = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const technologies = [
    { id: '1', title: 'Drone Technology', image: 'https://via.placeholder.com/200', description: 'Drones help monitor crops, reduce labor, and improve efficiency in farming.' },
    { id: '2', title: 'Smart Irrigation', image: 'https://via.placeholder.com/200', description: 'Smart irrigation systems optimize water usage by automating the watering process.' },
  ];

  const insuranceData = [
    {
      id: '1',
      policy: 'Crop Insurance',
      premium: '₹500/year',
      expiry: '31 Dec 2024',
      damageCoverage: '₹50,000',
      description: 'Provides financial support to farmers in case of crop failure due to natural calamities.',
    },
    {
      id: '2',
      policy: 'Livestock Insurance',
      premium: '₹700/year',
      expiry: '15 Mar 2025',
      damageCoverage: '₹1,00,000',
      description: 'Covers financial losses due to the death or illness of livestock.',
    },
  ];

  const successStories = [
    { id: '1', title: 'Ram’s Success with Drip Irrigation', image: 'https://via.placeholder.com/200', description: 'Ram increased his crop yield by 30% using drip irrigation technology.' },
    { id: '2', title: 'Organic Farming in Bihar', image: 'https://via.placeholder.com/200', description: 'Farmers in Bihar achieved better profits by switching to organic farming methods.' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <LinearGradient colors={['#76c893', '#52b788']} style={[styles.heroSection]}>
        <Text style={[styles.heroTitle, { marginTop: 30 }]}>Farmers' Knowledge Hub</Text>
        <Text style={styles.heroSubtitle}>Empowering Farmers with Knowledge</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x200' }}
          style={styles.heroImage}
        />
      </LinearGradient>

      {/* Technologies Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="tractor" size={20} color="#40916c" /> Latest Technologies
        </Text>
        <FlatList
          horizontal
          data={technologies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => openModal(item)}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Insurance Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="shield-alt" size={20} color="#4a90e2" /> Insurance Policies
        </Text>
        <FlatList
          horizontal
          data={insuranceData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.insuranceCard}
              onPress={() => openModal(item)}
            >
              <Text style={styles.insuranceText}>Policy: {item.policy}</Text>
              <Text style={styles.insuranceText}>Premium: {item.premium}</Text>
              <Text style={styles.insuranceText}>Expiry: {item.expiry}</Text>
              <Text style={styles.insuranceText}>Damage Coverage: {item.damageCoverage}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Success Stories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <MaterialIcons name="emoji-people" size={20} color="#ffba08" /> Success Stories
        </Text>
        <FlatList
          horizontal
          data={successStories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.storyCard}
              onPress={() => openModal(item)}
            >
              <Image source={{ uri: item.image }} style={styles.storyImage} />
              <Text style={styles.storyText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Modal View */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.title || selectedItem.policy}</Text>
              {selectedItem.premium && <Text style={styles.modalText}>Premium: {selectedItem.premium}</Text>}
              {selectedItem.expiry && <Text style={styles.modalText}>Expiry: {selectedItem.expiry}</Text>}
              {selectedItem.damageCoverage && (
                <Text style={styles.modalText}>Damage Coverage: {selectedItem.damageCoverage}</Text>
              )}
              <Text style={styles.modalDescription}>{selectedItem.description}</Text>
              <Button title="Close" onPress={closeModal} color="#00796b" />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5AB',
  },
  heroSection: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#f5f5f5',
    marginTop: 10,
    textAlign: 'center',
  },
  heroImage: {
    width: '80%',
    height: 150,
    marginTop: 20,
    borderRadius: 15,
  },
  section: {
    paddingBottom: 20,
    marginTop: 15,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    width: width * 0.6,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: '#333',
  },
  insuranceCard: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 15,
    marginRight: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: width * 0.6,
  },
  insuranceText: {
    fontSize: 16,
    color: '#00796b',
    marginBottom: 5,
    textAlign: 'center',
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    width: width * 0.6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  storyImage: {
    width: '100%',
    height: 120,
  },
  storyText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 20,
    color: '#555',
    textAlign: 'center',
  },
});

export default Education;
