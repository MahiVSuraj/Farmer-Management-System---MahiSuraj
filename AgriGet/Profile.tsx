import React from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native';
import { Avatar, Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Profile() {
  return (
      <ScrollView style={[styles.container,{backgroundColor:"#F3E5AB"}]} contentContainerStyle={styles.contentContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Avatar.Image size={100} source={require('./assets/image1.jpeg')} style={{marginTop:20}}/>
          <Text style={styles.name}>Farmer Name</Text>
          <Text style={styles.region}>Region: Village XYZ</Text>
        </View>

        {/* Debt Analysis */}
        <Card style={[styles.card,{marginTop:20}]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="cash-multiple" size={24} color="#4CAF50" />
              <Title style={styles.cardTitle}>Debt Analysis</Title>
            </View>
            <Paragraph>Current Debt: ₹50,000</Paragraph>
            <Paragraph>Repayment Rate: 75%</Paragraph>
          </Card.Content>
        </Card>

        {/* Update Details */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="account-edit" size={24} color="#4CAF50" />
              <Title style={styles.cardTitle}>Update Your Details</Title>
            </View>
            <Paragraph>Keep your profile up to date.</Paragraph>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => alert('Update Details clicked!')}
            >
              Update Details
            </Button>
          </Card.Content>
        </Card>

        {/* Crop Details */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="corn" size={24} color="#4CAF50" />
              <Title style={styles.cardTitle}>Crop Details</Title>
            </View>
            <Paragraph>Current Crops: Wheat, Rice</Paragraph>
            <Paragraph>Area Cultivated: 5 Acres</Paragraph>
          </Card.Content>
        </Card>

        {/* Upcoming Tasks */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="calendar-check" size={24} color="#4CAF50" />
              <Title style={styles.cardTitle}>Upcoming Tasks</Title>
            </View>
            <Paragraph>- Sowing new crops: December 15th</Paragraph>
            <Paragraph>- Irrigation check: December 20th</Paragraph>
          </Card.Content>
        </Card>

        {/* Support Section */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="help-circle" size={24} color="#4CAF50" />
              <Title style={styles.cardTitle}>Need Support?</Title>
            </View>
            <Paragraph>Contact our agricultural experts for guidance.</Paragraph>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => alert('Get Support clicked!')}
            >
              Get Support
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Neutral background
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50, // Pushes down the header to avoid notch overlap
    paddingBottom: 20,
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  region: {
    fontSize: 16,
    color: '#E8F5E9',
  },
  card: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFF', // White background for cards
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: '#4CAF50', // Matching green for titles
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
  },
});
