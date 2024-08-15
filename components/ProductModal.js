import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductModal = ({ modalVisible, closeModal, selectedProduct, handleAddToCart }) => {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {selectedProduct && (
              <>
                <Image source={{ uri: selectedProduct.image }} style={styles.modalProductImage} />
                <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                <Text style={styles.modalPrice}>Rs.{selectedProduct.price}</Text>
                <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    onPress={() => handleAddToCart(selectedProduct)} 
                    style={[styles.button, styles.addButton]}
                  >
                    <Icon name="cart-outline" size={18} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Add to Cart</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={closeModal} 
                    style={[styles.button, styles.closeButton]}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '90%', 
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  scrollContainer: {
    flexGrow: 1, 
  },
  modalProductImage: {
    width: '100%', 
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'red',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProductModal;
