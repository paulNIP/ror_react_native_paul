// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeStackNavigator from "./HomeStackNavigator";
// import SettingsStackNavigator from "./SettingsStackNavigator";
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Library from "../screens/Library";
// import {View,TouchableOpacity,Text }from 'react-native' ;  

// import Icon from 'react-native-ionicons';          
// import StoreNavigator from "./StoreNavigator";
// import Audio from "../screens/Audio";


// const Tab = createBottomTabNavigator();

// function TabNavigator(props) {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused }) => {
//           let iconName;

//           if (route.name === "Home") {
//             iconName = 'home';
//           }else if (route.name === "Audio") {
//             iconName = 'music-note';
//           } else if (route.name === "Library") {
//             iconName = 'bookshelf';
//           } else if (route.name === "Store") {
//             iconName = 'cart-outline';
//           }
        

//           // You can return any component that you like here!
//           // return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
//           return <MaterialCommunityIcons style={{alignSelf:'center'}} name={iconName} size={25} color ={focused ? '#F9A825' : 'gray'} />
//         },
//         tabBarActiveTintColor: "#F9A825",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
//       <Tab.Screen name="Audio" component={Audio} options={{
//             backgroundColor:'#F9A825',
//             title: 'Audio',
//             headerStyle: {
//               backgroundColor: '#F9A825',
//             },

//             headerLeft: () => (
//               <View>
//                 <TouchableOpacity onPress={ ()=>navigation.toggleDrawer()}>
//                <MaterialCommunityIcons style={{alignSelf:'center'}} name="menu" size={30} color="#FFFFFF" />
//                </TouchableOpacity>              
//               </View>
//              ),
//              headerCenter: () => (
//               <View>
//                 <Text>TESTING</Text>
//               </View>
//             ),
//             headerRight: () => (
//               <View>
//                 <TouchableOpacity onPress={ ()=>navigation.navigate('FeedBack')}>
//                <Text style={{fontWeight:"bold",color:'#FFFFFF'}}>FEEDBACK</Text>
//                </TouchableOpacity>
//               </View>
//              ),
//           }}/>
//       {/* <Tab.Screen name="Maps" component={Directions} options={{ headerShown: false }} /> */}
//       <Tab.Screen name="Library" component={Library} options={{
//             backgroundColor:'#F9A825',
//             title: 'Library',
//             headerStyle: {
//               backgroundColor: '#F9A825',
//             },

//             headerLeft: () => (
//               <View>
//                 <TouchableOpacity onPress={ ()=>props.navigation.toggleDrawer()}>
//                <MaterialCommunityIcons style={{alignSelf:'center'}} name="menu" size={30} color="#FFFFFF" />
//                </TouchableOpacity>              
//               </View>
//              ),
//              headerCenter: () => (
//               <View>
//                 <Text>TESTING</Text>
//               </View>
//             ),
//             headerRight: () => (
//               <View style={{flexDirection:"row"}}>
//                 <TouchableOpacity onPress={ ()=>props.navigation.navigate('FeedBack')}>
//                <Text style={{fontWeight:"bold",color:'#FFFFFF'}}>FEEDBACK</Text>
               
//                </TouchableOpacity>
//                <TouchableOpacity onPress={ ()=>props.navigation.navigate('FeedBack')}>

//                {/* <MaterialCommunityIcons style={{alignSelf:'center'}} name="menu" 
//                size={30} color="#FFFFFF" /> */}
//                 <Icon
//                     name="search-outline"
//                     size={30}
//                     color="white"
//                   />
//               </TouchableOpacity>
//               </View>
//              ),
//           }}/>
//       <Tab.Screen name="Store" component={StoreNavigator} options={{ headerShown: false }} />
//     </Tab.Navigator>
//   );
// }

// export default TabNavigator;