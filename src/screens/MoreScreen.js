import React from "react";
import {View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MoreScreen = () => {
  const navigation = useNavigation();
  return (
       <View>
        <Text>Feed Back</Text>
       </View>
  );
};

export default MoreScreen;