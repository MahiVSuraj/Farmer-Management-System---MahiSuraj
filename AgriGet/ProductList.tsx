import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://127.0.0.1:8000/subsidiaries/api/products/')
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'success') {
          // Transform data to match the existing card structure
          const transformedProducts = data.data.map((item) => ({
            id: item.id,
            name: item.ProductName,
            category: item.Category,
            final_price: item.ProductPrice,
            availability_status: item.StockAvailability ? 'Available' : 'Out of Stock',
            supplier: 'Unknown Supplier', // Placeholder since supplier info isn't in the API
            image: `http://127.0.0.1:8000${item.ProductImage}`, // Full URL for the image
          }));
          setProducts(transformedProducts);
        } else {
          console.error('Unexpected API response:', data);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        {/* Product Image */}
        <View style={styles.imagePlaceholder}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.imageStyle} />
          ) : (
            <Text style={styles.imageText}>Image</Text>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
          <Text style={styles.productPrice}>₹{item.final_price} / unit</Text>
          <Text style={styles.productAvailability}>
            {item.availability_status}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: width * 0.05,
  },
  productContainer: {
    flexDirection: 'row',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.05,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: width * 0.04,
    backgroundColor: '#FFF8DC',
  },
  imagePlaceholder: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#f0f0f0',
    borderRadius: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.05,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.05,
  },
  imageText: {
    color: '#888',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.005,
  },
  productCategory: {
    fontSize: width * 0.04,
    color: '#888',
    marginBottom: height * 0.005,
  },
  productPrice: {
    fontSize: width * 0.045,
    color: '#333',
    marginBottom: height * 0.005,
  },
  productAvailability: {
    fontSize: width * 0.04,
    color: '#4CAF50',
    marginBottom: height * 0.005,
  },
});

export default ProductList;
