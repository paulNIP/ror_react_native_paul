import React ,{useEffect,useState} from "react";
import {View, Text,Button, SafeAreaView,ScrollView,Alert,FlatList,
   TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import { getWallet } from "../service/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";


const WalletScreen = () => {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [wallet, setWallet] = useState();

  useEffect(() => {

      const fetchData = async () => {
          const email= await AsyncStorage.getItem('email');
          const data = await getWallet(email);
          setWallet(data);

      }
      fetchData();

    }, []);

  console.log(wallet);

  const renderWallet = ({ item }) => {

    return (
      <>
      <View style={[styles.card3, styles.shadowProp]}>
        <View style={{backgroundColor:'#0c3866'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{justifyContent:'flex-start'}}>
                  <Text style={{color:"white"}}>
                    {item.CopiesSponsored}
                  </Text>
                  <Text style={{color:"white"}}>
                    Copies Sponspored
                  </Text>
                  <Text style={{color:"white",fontWeight:'bold'}}>
                    {item.fullnames}
                  </Text>
                  <TouchableOpacity style={{marginTop:10,height:40,backgroundColor:'#49c0b6',borderRadius:5}}
                  onPress={() => Alert.alert('Simple Button pressed')}
                >
                  <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',marginTop:10,marginStart:10,marginEnd:10}}>
                    UPGRADE ACCOUNT
                  </Text>
                </TouchableOpacity>

                <Text style={{color:"white"}}>
                    Subscribed
                  </Text>

              </View>

              <View style={{justifyContent:'flex-end'}}>
                  <Text style={{color:"white"}}>
                  {item.PointsBalance}
                  </Text>
                  <Text style={{color:"white"}}>
                    Points Balance
                  </Text>
                  <Text style={{color:"white"}}>
                    {}
                  </Text>
                  <TouchableOpacity style={{marginTop:10,height:40}}
                  onPress={() => Alert.alert('Simple Button pressed')}
                >
                  <Text style={{color:'white',fontWeight:'bold',marginTop:10}}>
                  {item.totalpoints}
                  </Text>
                </TouchableOpacity>

                <Text style={{color:"white"}}>
                    Total Points
                  </Text>

              </View>


            </View>
            
          </View>
          </View>



          <TouchableOpacity style={{marginTop:10,marginBottom:10,height:40,backgroundColor:'#49c0b6'}}
              onPress={() => Alert.alert('Simple Button pressed')}
            >
              <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',marginTop:10}}>
                REDEEM POINTS BALANCE
              </Text>
          </TouchableOpacity>


          <View style={[styles.card, styles.shadowProp]}>
          <View>
            </View>
            <Text style={{alignSelf:"center",color:"#F9A825",fontWeight:"bold"}}>
            RHAPSODY SUBSCRIPTION
            </Text>
          </View>

          <View style={[styles.card, styles.shadowProp]}>
          <View>
            </View>
            <Text style={{alignSelf:"center",color:"#F9A825",fontWeight:"bold"}}>
            PERSONAL LINK
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={item.shareid}
              placeholder={item.shareid}
              keyboardType="numeric"
            />

            <TouchableOpacity style={{marginTop:10,height:40,backgroundColor:'#F9A825'}}
              onPress={() => Alert.alert('Simple Button pressed')}
            >
              <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',marginTop:10}}>
                COPY LINK
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:10,height:40,backgroundColor:'#0c3866'}}
              onPress={() => Alert.alert('Simple Button pressed')}
            >
              <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',marginTop:10}}>
                VIEW ENLISTED PEOPLE
              </Text>
            </TouchableOpacity>


          </View>

          <View style={{flexDirection:'row'}}>
              <View style={[styles.shadowProp]}>
                
              </View>

              <View style={[styles.shadowProp]}>
                
              </View>

          </View>

          </>

      
    );
  };


  return (
    <SafeAreaView >
    <ScrollView style={{marginLeft:16,marginRight:16,marginTop:10}}>

    <View style={[styles.card3, styles.shadowProp]}>
        <View style={{backgroundColor:'#0c3866'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{justifyContent:'flex-start'}}>
                  <Text style={{color:"white"}}>
                     -
                  </Text>
                  <Text style={{color:"white"}}>
                    Copies Sponspored
                  </Text>
                  <Text style={{color:"white",fontWeight:'bold'}}>
                    Paul
                  </Text>
                  <TouchableOpacity style={{marginTop:10,height:40,backgroundColor:'#49c0b6',borderRadius:5}}
                  onPress={() => Alert.alert('Simple Button pressed')}
                >
                  <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',marginTop:10,marginStart:10,marginEnd:10}}>
                    UPGRADE ACCOUNT
                  </Text>
                </TouchableOpacity>

                <Text style={{color:"white"}}>
                    Subscribed
                  </Text>

              </View>

              <View style={{justifyContent:'flex-end'}}>
                  <Text style={{color:"white"}}>
                    -
                  </Text>
                  <Text style={{color:"white"}}>
                    Points Balance
                  </Text>
                  <Text style={{color:"white"}}>
                    {}
                  </Text>
                  <TouchableOpacity style={{marginTop:10,height:40}}
                  onPress={() => Alert.alert('Simple Button pressed')}
                >
                  <Text style={{color:'white',fontWeight:'bold',marginTop:10}}>
                    -
                  </Text>
                </TouchableOpacity>

                <Text style={{color:"white"}}>
                    Total Points
                  </Text>

              </View>


            </View>
            
          </View>
          </View>



          <TouchableOpacity style={{marginTop:10,marginBottom:10,height:40,backgroundColor:'#49c0b6'}}
              onPress={() => Alert.alert('Simple Button pressed')}
            >
              <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',marginTop:10}}>
                REDEEM POINTS BALANCE
              </Text>
          </TouchableOpacity>


          <View style={[styles.card, styles.shadowProp]}>
          <View>
            </View>
            <Text style={{alignSelf:"center",color:"#F9A825",fontWeight:"bold"}}>
            RHAPSODY SUBSCRIPTION
            </Text>
          </View>

          <View style={[styles.card, styles.shadowProp]}>
          <View>
            </View>
            <Text style={{alignSelf:"center",color:"#F9A825",fontWeight:"bold"}}>
            PERSONAL LINK
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="useless placeholder"
              keyboardType="numeric"
            />

            <TouchableOpacity style={{marginTop:10,height:40,backgroundColor:'#F9A825'}}
              onPress={() => Alert.alert('Simple Button pressed')}
            >
              <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',marginTop:10}}>
                COPY LINK
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:10,height:40,backgroundColor:'#0c3866'}}
              onPress={() => Alert.alert('Simple Button pressed')}
            >
              <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',marginTop:10}}>
                VIEW ENLISTED PEOPLE
              </Text>
            </TouchableOpacity>


          </View>

          <View style={{flexDirection:'row'}}>
              <View style={[styles.shadowProp]}>
                
              </View>

              <View style={[styles.shadowProp]}>
                
              </View>

          </View>



          


          <FlatList data={wallet} renderItem={renderWallet} />
        
      </ScrollView >
      </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 5,
  },
  card2: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '45%',
    marginVertical: 5,
  },
  card3: {
    backgroundColor: '#0c3866',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
});

export default WalletScreen;