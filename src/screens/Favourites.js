import React from "react";
import {View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Favourites = () => {
    const navigation = useNavigation();
  return (
       <View>
        <Text>No Favourites Found</Text>
       </View>
  );
};

export default Favourites;