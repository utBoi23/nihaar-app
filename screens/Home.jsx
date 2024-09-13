import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome to Nihaar Store</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#6f42c1' }]} // Purple
          onPress={() => navigation.navigate('AddProducts')}
        >
          <Text style={styles.buttonText}>Add Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#28a745' }]} // Green
          onPress={() => navigation.navigate('ProductsData')}
        >
          <Text style={styles.buttonText}>Products List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fd7e14' }]} // Orange
          onPress={() => navigation.navigate('UpdateProduct')}
        >
          <Text style={styles.buttonText}>Update Product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#17a2b8' }]} // Teal
          onPress={() => navigation.navigate('GenerateInvoices')}
        >
          <Text style={styles.buttonText}>Generate Invoices</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b5dcef', // Light gray background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
    textAlign: 'center',
    fontFamily: 'Verdana, Arial, sans-serif',
    
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: '#007bff', // Default background color for button
    // Add transparency and shadow effects
    backgroundColor: 'rgba(0, 123, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Verdana, Arial, sans-serif',
    fontWeight:'bold'
  },
});

export default Home;
