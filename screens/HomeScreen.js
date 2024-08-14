import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {setProducts, addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../CartReducer";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  const products = useSelector(state => state.cart.products);
  const cart = useSelector(state => state.cart.cart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        dispatch(setProducts(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    closeModal();
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.productContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemTitle}>{item.title}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))}>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))}>
          <Text style={styles.button}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
         <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image source={{ uri: selectedProduct.image }} style={styles.productImage} />
                <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
                <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
                <Button title="Add to Cart" onPress={() => handleAddToCart(selectedProduct)} />
              </>
            )}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.cartTitle}>Cart</Text>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // height:220,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  productImage: {
    width: 10,
    height: 10,
    maxHeight:20,
    resizeMode: 'contain',
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    marginTop:4,
  },
  cartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cartItemTitle: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default HomeScreen;
