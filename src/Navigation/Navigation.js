import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '../Screens/Home'


const Stack = createNativeStackNavigator()


const Navigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}
export default Navigation