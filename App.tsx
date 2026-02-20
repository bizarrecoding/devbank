import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HeaderTitle from './src/components/HeaderTitle';
import Inicio from './src/screens/inicio';
import Producto from './src/screens/producto';
import Registro from './src/screens/registro';
import { theme } from './src/components/theme';

export default function App() {
  return <RootNavigator/>
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

