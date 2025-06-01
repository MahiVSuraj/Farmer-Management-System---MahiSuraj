import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Button,
  useWindowDimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SchemeCard from './Schemescard';

export default function SchemesList() {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          'http://127.0.0.1:8000/schemes/schemes-end-point/'
        );
        const json = await response.json();

        if (json.message === 'success') {
          setSchemes(json.data);
          setFilteredSchemes(json.data);
        } else {
          console.error('Failed to fetch schemes');
        }
      } catch (error) {
        console.error('Error fetching schemes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const filterSchemes = (filter) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredSchemes(schemes);
    } else if (filter === 'Eligible') {
      setFilteredSchemes(schemes.filter((scheme) => scheme.status));
    } else if (filter === 'State') {
      setFilteredSchemes(schemes.filter((scheme) => scheme.type === 'St'));
    } else if (filter === 'Central') {
      setFilteredSchemes(schemes.filter((scheme) => scheme.type === 'Ct'));
    }
  };

  const openModal = (scheme) => {
    setSelectedScheme(scheme);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedScheme(null);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F3E5AB' }}>
      <View style={{ backgroundColor: '#F3E5AB', marginTop: height * 0.07 }}>
        <View style={styles.headerContainer}>
          <MaterialIcons name="local-offer" size={30} color="#007bff" />
          <Text style={styles.headerText}>Schemes for You</Text>
        </View>
        <View style={styles.filterContainer}>
          {['All', 'State', 'Central', 'Eligible'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilterButton,
              ]}
              onPress={() => filterSchemes(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === filter && styles.activeFilterButtonText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filteredSchemes}
          style={{ backgroundColor: '#F3E5AB' }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SchemeCard item={item} onSelect={openModal} />
          )}
        />
      </View>

      {/* Modal View */}
      {selectedScheme && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedScheme.name}</Text>
              <Text>{selectedScheme.description}</Text>
              <Text style={{ color: selectedScheme.status ? 'green' : 'red' }}>
                {selectedScheme.status
                  ? 'You are eligible for this scheme.'
                  : 'You are not eligible for this scheme.'}
              </Text>
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3E5AB',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 12,
    color: 'black',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#F3E5AB',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  filterButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#F3E5AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#333',
  },
  activeFilterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
