import React from 'react';


import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Screen1 from './screens/Screen1';
import AddProducts from './screens/AddProducts';
import ProductsData from './screens/ProductsData';
import GenerateInvoices from './screens/GenerateInvoices';


const stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Home">
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="Screen1" component={Screen1} />
        <stack.Screen name="AddProducts" component={AddProducts} />
        <stack.Screen name="ProductsData" component={ProductsData} />
        <stack.Screen name="GenerateInvoices" component={GenerateInvoices} />





      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
