import React , { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,View
} from 'react-native';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const MoreScreen = ({ route, navigation }) => {



  const [words, setWords] = useState([]);
 
  useEffect(() => {

      const fetchData = async () => {
          const data = await getRelatedArticles(title);
          setWords(data)
      }
      fetchData();

  }, []);
return (
  <SafeAreaView >
      <ScrollView>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <View style={{flexDirection:'row'}}>
        <MaterialCommunityIcons style={{marginStart:10}} name="file-find-outline" size={30} color="gray" />
            <Text style={{marginStart:10,fontSize:30}}>Home</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:15
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  });

export default MoreScreen;