import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    
    <SafeAreaView style={styles.headerContainer}>
      {route.name === 'Cart' ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={25} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      ) : null}
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      {route.name !== 'Cart' ? (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart-outline" size={25} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f4511e',
    padding: 10,
    //paddingTop: 30, 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  icon: {
    paddingHorizontal: 10,
  },
});

export default Header;
