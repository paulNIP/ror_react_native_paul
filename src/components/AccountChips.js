import React ,{useEffect,useState} from 'react';
import { View, ScrollView, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { Chip, withTheme, lightColors } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage";


import { useNavigation } from '@react-navigation/native';
import { getProfile } from '../service/authService';

const AccountChips = () => {
  const navigation = useNavigation();
  const walletClickedHandler = () => {
    navigation.navigate('Wallet');
  };

  const subscriptionClickedHandler = () => {
    navigation.navigate('Subscription');
  };

  const [profile, setProfile] = useState();
  const [status, setStatus] = useState();


  useEffect(() => {

      const fetchData = async () => {
          const email= await AsyncStorage.getItem('email');
          const data = await getProfile(email);
          setProfile(data);
          setStatus(data.subscription.status);


      }
      fetchData();

    }, []);




return (
  <>
    <ScrollView>
      <View style={styles.contentView}>
      
          <TouchableOpacity style={styles.roundButton}
            onPress={walletClickedHandler}
            >
            <Text>Check Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundButton}
            onPress={subscriptionClickedHandler}
            >
            <Text>Upgrade Subscription</Text>
          </TouchableOpacity>

          { status==='active' ?(null):
          
            (
              // return if profile subscription is inactive or null
              <TouchableOpacity style={styles.roundButton}
              onPress={subscriptionClickedHandler}
              >
              <Text>Free trial</Text>
            </TouchableOpacity>
            )
        
        
           }
          

      </View>
    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
    contentView: {
      flex: 1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'space-between',
      justifyContent: 'center',
      marginVertical: 15

    },
    roundButton: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      marginEnd:5,
      borderRadius: 20,
      backgroundColor: '#D8D9DA',
    },
});

export default AccountChips;