import React from "react";
import {View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SearchArticles = () => {
    const navigation = useNavigation();
  return (
       <View>
        <Text>SearchArticles</Text>
       </View>
  );
};

export default SearchArticles;