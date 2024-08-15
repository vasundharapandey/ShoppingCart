import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image, StyleSheet, Button, ActivityIndicator, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../store/CartReducer";
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import ProductModal from '../components/ProductModal';
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const bannerOpacity = useState(new Animated.Value(0))[0];

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
      } finally {
        setLoading(false);
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
    showSuccessBanner();
  };

  const showSuccessBanner = () => {
    setShowBanner(true);
    Animated.timing(bannerOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(bannerOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowBanner(false);
        });
      }, 2000);
    });
  };

  const renderProduct = ({ item }) => {
    const cartItem = cart.find(cartItem => cartItem.id === item.id);

    return (
      <TouchableOpacity onPress={() => openModal(item)}>
        <View style={styles.productContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
              {item.title}
            </Text>
            <View style={styles.ratingcontainer}>
              <StarRatingDisplay
                rating={item.rating.rate}
                maxStars={5}
                starSize={20}
                starStyle={styles.star}
              />
              <Text style={styles.ratingText}>{item.rating.count}</Text>
            </View>
            <View style={styles.row3}>
              <Text style={styles.productPrice}>Rs. {item.price}</Text>
             
                {cartItem && (
                  <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))}>
                      <MaterialCommunityIcons name="minus" color={'#000'} size={20} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{cartItem.quantity}</Text>
                    <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))}>
                      <MaterialCommunityIcons name="plus" color={'#000'} size={20} />
                    </TouchableOpacity>
                    </View>
                )}
           
            </View>
            <Text style={styles.category}>Category: {item.category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // const renderProduct = ({ item }) => (
  //   <TouchableOpacity onPress={() => openModal(item)}>
  //     <View style={styles.productContainer}>
  //       <Image source={{ uri: item.image }} style={styles.productImage} />
  //       <View style={styles.productInfo}>
  //         <Text style={styles.productTitle}>{item.title}</Text>
  //         <Text style={styles.productPrice}>${item.price}</Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
      {showBanner && (
        <Animated.View style={[styles.banner, { opacity: bannerOpacity }]}>
          <Text style={styles.bannerText}>Item added to cart successfully!</Text>
        </Animated.View>
      )}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
      />
      <ProductModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
      />
    </View>
  
  );
};

const styles = StyleSheet.create({
  superContainer:{
flex:1
  },
  container: {
    flex: 1,
    padding: 16,
      backgroundColor:'#fff'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 10,
    height: 150,
  },
  productImage: {
    width: 90,
    height: 120,
    maxHeight: 130,
    resizeMode: 'contain',
    marginRight: 16,
  },
  productInfo: {

    flexDirection: 'column',
    width: '60%',
  },
  productTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 4,
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
    padding: 10,
    zIndex: 10,
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
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
  modalProductImage: {
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
  ratingcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
   },
  star: {
    marginRight: 1,
  },
  ratingText: {
    fontSize: 16,
    color: '#9c9c9c',
    fontWeight:'bold',
    marginLeft:5
  },
  category:{
    color: '#9c9c9c',
     fontWeight:'bold',
     marginTop: 3,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
    backgroundColor:'lightgray',
    width:70,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
  },
  row3:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:200,
  },
});

export default HomeScreen;
