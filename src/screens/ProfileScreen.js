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
import {Dimensions,Alert} from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { getProfile } from '../service/authService';




const ProfileScreen = ({navigation}) => {

  const [profile, setProfile] = useState();
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);


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

    const openImagePicker = () => {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };
  
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error: ', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          setSelectedImage(imageUri);
          Alert.alert(selectedImage);

        }
      });
    };




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
            color="#FFFFFF"
            size="large"
          />
          </View>
        )}

{profile &&(
  <View>
    <View style={styles.ncontainer}>
          <Image style={{width:'auto',height:Dimensions.get('window').height*0.2}}
            source={require('../assets/greybands.jpeg')} />
          <Image
            style={styles.logoStyle}
            source={require('../assets/prof.png')}
          />
          <TouchableOpacity onPress={()=>{openImagePicker}} 
          style={{alignSelf:'center',backgroundColor:'#F9A825',width:40,marginTop:-15,height:40,borderRadius:20}}
          >
              <MaterialCommunityIcons  style={{alignContent:'center',marginTop:5,
              justifyContent:'center',alignSelf:'center',verticalAlign:'middle'}}
                                      name="camera" size={30} color="#FFFFFF" /> 
          </TouchableOpacity>

          <Text style={{marginLeft:10,marginTop:30,alignSelf:'center'}}>My Profile</Text>
          <Text style={{marginLeft:10,alignSelf:'center',color:'#89CFF0'}}>Personal Information</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('EditProfile')}} 
          style={{alignSelf:'center',backgroundColor:'#F9A825',width:100}}
          >
            <View style={{flexDirection:'row'}}>
            <Icon style={{marginEnd:10, marginStart:20}} name="lead-pencil" type="material-community" color="#FFFFFF" />
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

    <TouchableOpacity style={{alignSelf:'center',
    backgroundColor:'#F9A825',padding:10,marginBottom:10}} onPress={()=>{
      navigation.navigate('SubscriptionsScreen');
    }}>
        <View style={{flexDirection:'row',backgroundColor:'F9A825'}}>
        <Text style={{color:'grey',marginTop:3,color:'#FFFFFF'}}>UPDATE SUBSCRIPTION</Text>
        </View>
      </TouchableOpacity>


    </View>
  </View>


)}






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