// import React in our code
import React, {useState,useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LogBox,Image,ActivityIndicator,FlatList
} from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';



import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { getProfile } from '../service/authService';



const renderItem = ({ item }) => {
  return (
    <View>
        
    </View>

  );

}
const ProfileScreen = ({navigation}) => {

  const [profile, setProfile] = useState();
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {


      const fetchData = async () => {
          const value = await AsyncStorage.getItem('email');
          const data = await getProfile(value);
          setProfile(data);
          console.log("Profile Data",data);
          setIsLoading(false);
          

      }
      
      fetchData();

    }, []);




  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>

      
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

        </View>


        <FlatList data={profile} renderItem={renderItem} />




    {isLoading && (
        <View style={{  
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
          <ActivityIndicator
            style={{ height: 80 }}
            color="#C00"
            size="large"
          />
          </View>
        )}

<View style={styles.ncontainer}>
          <Image style={{width:'auto',height:150}}
            source={require('../assets/greybands.jpeg')} />
          <Image
            style={styles.logoStyle}
            source={require('../assets/prof.png')}
          />
          <Text style={{marginLeft:10,marginTop:30,alignSelf:'center'}}>My Profile</Text>
          <Text style={{marginLeft:10,alignSelf:'center',color:'#89CFF0'}}>Personal Information</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Edit Profile')}} 
          style={{alignSelf:'center',backgroundColor:'#F9A825',width:100}}
          >
            <View style={{flexDirection:'row'}}>
            <Icon style={{marginEnd:10, marginStart:20}} name="lead-pencil" type="material-community" color="grey" />
            <Text style={{color:'grey',marginTop:3,color:'#FFFFFF'}}>Edit</Text>
            </View>
          </TouchableOpacity>

          <View style={{flexDirection:'row'}}>
            <Icon style={{marginEnd:10, marginStart:10}} name="account-box" type="material-community" color="grey" />
            <Text style={{color:'grey'}}>FULL NAMES</Text>
            </View>
            <Text style={{marginStart:10,marginTop:5,marginBottom:5}}>{profile.name}</Text>

            <View style={{flexDirection:'row'}}>
            <Icon style={{marginEnd:10, marginStart:10}} name="email" type="material-community" color="grey" />
            <Text style={{color:'grey'}}>EMAIL ADDRESS</Text>
            </View>
            <Text style={{marginStart:10,marginTop:5,marginBottom:5}}>{profile.email}</Text>

            <View style={{flexDirection:'row'}}>
            <Icon style={{marginEnd:10, marginStart:10}} name="phone" type="material-community" color="grey" />
            <Text style={{color:'grey'}}>PHONE NUMBER</Text>
            </View>
            <Text style={{marginStart:10,marginTop:5,marginBottom:5}}>{profile.phone}</Text>


        </View>



      <View style={styles.mcontainer}>
      <Text style={{marginLeft:10,marginTop:30,alignSelf:'center'}}>My Subcription Plan</Text>
      <Text style={{marginLeft:10,alignSelf:'center',color:'#89CFF0'}}>Personal Information</Text>
     

      <View style={{flexDirection:'row'}}>
        <Text style={{color:'grey', marginStart:10}}>SUBSCRIPTION STATUS</Text>
        </View>
        <Text style={{marginStart:10,marginTop:5,marginBottom:5}}>{profile.subscription.status}</Text>

        <View style={{flexDirection:'row'}}>
        <Text style={{color:'grey', marginStart:10}}>EXPIRY DATE</Text>
        </View>
        <Text style={{marginStart:10,marginTop:5,marginBottom:5}}>{profile.subscription.end_date}</Text>

    <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#F9A825',padding:10,marginBottom:10}}>
        <View style={{flexDirection:'row',backgroundColor:'F9A825'}}>
        <Text style={{color:'grey',marginTop:3,color:'#FFFFFF'}}>UPDATE SUBSCRIPTION</Text>
        </View>
      </TouchableOpacity>


    </View>





      </View>
      </ScrollView>
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

  ncontainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius:15,
    marginTop:5
  },
  paragraphStyle: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoStyle: {
    height: 100,
    width: 100,
    alignSelf:'center',
    marginTop:-120
  },

  mcontainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius:15,
    marginTop:15
  },

});


export default ProfileScreen;