
import React from 'react';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import store from './store/store';
import CartScreen from './screens/CartScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Header from './components/Header';
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
   <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Products" 
            component={HomeScreen} 
            options={{ 
              header: () => <Header title="Shopping" />,
            }} 
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen} 
            options={{ 
              header: () => <Header title="My Cart" />,
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor='#161622'
      style='light'/>
    </Provider>
  );
};

export default App;
