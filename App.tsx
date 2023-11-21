import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';

import 'react-native-gesture-handler';
import { HomeScreen } from './src/screens/HomeScreen';
import { AudioScreen } from './src/screens/AudioScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { StoreScreen } from './src/screens/StoreScreen';
import { MoreScreen } from './src/screens/MoreScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#D8A623",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};


function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function AudioStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Rhapsody Audio" component={AudioScreen} />
    </Stack.Navigator>
  );
}

function LibraryStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Rhapsody Library" component={LibraryScreen} />
    </Stack.Navigator>
  );
}

function StoreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Rhapsody Store" component={StoreScreen} />
    </Stack.Navigator>
  );
}

function MoreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="More Settings" component={MoreScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator 
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
					  let iconName= "Home";
		  
					  if (route.name === 'Home') {
						  iconName = 'home-sharp';
					  } else if (route.name === 'Audio') {
						  iconName = 'musical-note-sharp';
					  } else if (route.name === 'Library') {
						  iconName = 'library-sharp';
					  }else if (route.name === 'Store') {
              iconName = 'cart-sharp';
              } else if (route.name === 'More') {
              iconName = 'ellipsis-horizontal-sharp';
              }
		  
					  return <IonIcon name={iconName} size={size} color={color}/>;
					},
          tabBarActiveTintColor: '#D8A623',
          tabBarInactiveTintColor: '#333333',
				  })}>
				<Tab.Screen name="Home" component={HomeStackNavigator} options={{headerShown: false}} />
				<Tab.Screen name="Audio" component={AudioStackNavigator} options={{headerShown: false}} />
				<Tab.Screen name="Library" component={LibraryStackNavigator} options={{headerShown: false}} />
        <Tab.Screen name="Store" component={StoreStackNavigator} options={{headerShown: false}}  />
				<Tab.Screen name="More" component={MoreStackNavigator} options={{headerShown: false}} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});