import React from 'react';
import {View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Inicio from './src/screens/inicio';
import Producto from './src/screens/producto';
import Registro from './src/screens/registro';
import HeaderTitle from './src/components/HeaderTitle';
import { theme } from './src/components/theme';

export default function App() {
  if(!__DEV__){
    return <View style={{flex: 1, backgroundColor: 'red'}} />
  }

  return (
    <RootNavigator/>
  );
}

const Stack = createNativeStackNavigator()

const RootNavigator = () => {
  return (
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName='Inicio'
          screenOptions={{
            headerTitle: () => <HeaderTitle /> 
          }}
        >     
          <Stack.Screen name='Inicio' component={Inicio} />
          <Stack.Screen name='Registro' component={Registro} />
          <Stack.Screen name='Producto' component={Producto} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

