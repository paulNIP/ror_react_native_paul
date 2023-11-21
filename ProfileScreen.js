// import React in our code
import React, {useState,useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LogBox,
} from 'react-native';

import FirstScreen from '../components/FirstScreen';
import SecondScreen from '../components/SecondScreen';
import ThirdScreen from '../components/ThirdScreen';
import { useNavigation } from '@react-navigation/native';



const ProfileScreen = ({navigation}) => {

  const [index, setIndex] = useState(1);
  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState();


    useEffect(() => {

      const getEmail = async () => {
        try {
          const value = await AsyncStorage.getItem('email')
          if(value !== null) {
            // value previously stored
            setEmail(value)
          }
        } catch(e) {
          // error reading value
        }
      }
      getEmail();

      const fetchData = async () => {
          const data = await getProfile(email)
          setProfile(data)

      }
      
      fetchData(email);

    }, []);

  const RenderElement = () => {
    //You can add N number of Views here in if-else condition
    if (index === 1) {
      //Return the FirstScreen as a child to set in Parent View
      return <FirstScreen />;
    } else if (index === 2) {
      //Return the SecondScreen as a child to set in Parent View
      return <SecondScreen />;
    } else {
      //Return the ThirdScreen as a child to set in Parent View
      return <ThirdScreen />;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          {/*To set the FirstScreen*/}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setIndex(1)}>
            <Text style={{color: '#ffffff'}}>PROFILE</Text>
          </TouchableOpacity>
          {/*To set the SecondScreen*/}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setIndex(2)}>
            <Text style={{color: '#ffffff'}}>SUBSCRIPTION</Text>
          </TouchableOpacity>
          {/*To set the ThirdScreen*/}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setIndex(3)}>
            <Text style={{color: '#ffffff'}}>ZONE</Text>
          </TouchableOpacity>
        </View>
        <Text>{profile}</Text>
        {/*View to hold the child screens 
        which can be changed on the click of a button*/}
        <View style={{backgroundColor: '#ffffff'}}>
          <RenderElement />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraphStyle: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#808080',
    padding: 10,
    margin: 2,
  },
});


export default ProfileScreen;