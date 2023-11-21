import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";

import React from 'react';
import { View, Text} from 'react-native';


function HomeDetailsPage({ navigation }) {



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Home Details" navigation={navigation} />
      <View >
        <Text>Home Details Calendar Module Example</Text>
      </View>
    </SafeAreaView>
  );
}






export default HomeDetailsPage;
