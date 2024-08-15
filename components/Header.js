import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const cartItems = useSelector(state => state.cart.cart);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <SafeAreaView style={styles.headerContainer}>
      {route.name === 'Cart' ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={25} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      ) : null}
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      {route.name !== 'Cart' && (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartContainer}>
          <Icon name="cart-outline" size={25} color="#fff" style={styles.icon} />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f4511e',
    padding: 10,
    height:90
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginLeft: 20,
  },
  icon: {
    paddingHorizontal: 10,
  },
  cartContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -2,
    top: -5,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Header;
