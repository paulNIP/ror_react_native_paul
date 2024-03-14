import React ,{useEffect,useState} from "react";
import {View, Text,Button, SafeAreaView,ScrollView,Alert,FlatList,
   TextInput,StyleSheet,TouchableOpacity,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import { BottomSheet,ListItem } from '@rneui/themed';
import { getEnlisted, getWallet, getWalletInfo } from "../service/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HTMLView from 'react-native-htmlview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WalletScreen = () => {

  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');



  const [wallet, setWallet] = useState();
  const [copiesSponsored, setCopiesSponsored] = useState();
  const [user, setUser] = useState();
  const [status, setStatus] = useState();
  const [totalpoints, setTotalPoints] = useState();
  const [pointsBalance, setPointsBalance] = useState();
  const [shareid, setShareid] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [enlister, setEnlisters] = useState();
  const [walletinfo, setWalletInfo] = useState();




  useEffect(() => {

      const fetchData = async () => {
          const email= await AsyncStorage.getItem('email');
          const data = await getWallet(email);
          console.log("Wallet data 67378383",data)
          setWallet(data);
          setCopiesSponsored(data.CopiesSponsored);
          setUser(data.fullnames);
          setStatus(data.status);
          setTotalPoints(data.totalpoints);
          setPointsBalance(data.PointsBalance);
          setShareid('rhapsodysubscriptions.org/me/'+data.shareid);
          const enlist =await getEnlisted(data.shareid);
          console.log("Enlisters",enlist.response);
          setEnlisters(enlist.response)

      }

      const fetchWalletInfo = async () => {
          const walletinfo2 = await getWalletInfo();
          console.log("walletinfo",walletinfo2);
          setWalletInfo(walletinfo2);

      }
      fetchData();
      fetchWalletInfo();

    }, []);



    const renderEnlisters = ( {item} ) => {
      return (
  
        <View style={{flex:1,flexDirection:"row",justifyContent:'space-between',padding:10}}>
          <Text>{item.fullnames}</Text>
          <Text>{item.zoneid}</Text>
          <Text>{item.read_status}</Text>
      </View>
      );
    };

    const renderWalletInfo = ( {item} ) => {
      return (
  
        <View style={{flex:1,flexDirection:"row",justifyContent:'space-between'}}>
          <Text>Name</Text>
          <Text>Zone</Text>
          <Text>Read Status</Text>
      </View>
      );
    };

  return (
    <SafeAreaView >
    <ScrollView style={{marginLeft:16,marginRight:16,marginTop:10}}showsVerticalScrollIndicator={false}>

    {wallet &&(
      <View>
      <View style={[styles.card3, styles.shadowProp]}>
      <View style={{backgroundColor:'#004d73',height:Dimensions.get('window').height*0.2,justifyContent:'center',alignContent:'center', paddingLeft : 10, paddingRight : 10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{justifyContent:'flex-start'}}>
                <Text style={{color:"white", fontSize : 30 }}>
                   {copiesSponsored}
                </Text>
                <Text style={{color:"white"}}>
                  Copies Sponspored
                </Text>
                <Text style={{color:"#D8A623",fontWeight:'bold'}}>
                  {user}
                </Text>
                <TouchableOpacity style={{marginTop:20,height:40,backgroundColor:'#03c0c1',borderRadius:1, width : 150, marginBottom : 20 }}
                onPress={() => navigation.navigate('Subscription') } >
                <Text style={{color:'white',alignSelf:'center',fontWeight:'700',marginTop:13, fontSize : 12 }}>
                  UPGRADE ACCOUNT
                </Text>
              </TouchableOpacity>

              {status===1?(

                <Text style={{color:"white"}}>
                  You have a {wallet.package} dollar(s) subscription
                </Text>

              ):(
                <Text style={{color:"white"}}>
                  UnSubscribed
                </Text>

              )}
            </View>

            <View style={{justifyContent:'flex-end'}}>
                <Text style={{color:"#D8A623", fontSize : 30}}>
                  {pointsBalance}
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
                <Text style={{color:'#D8A623',marginTop:10, fontSize : 30}}>
                  {totalpoints}
                </Text>
              </TouchableOpacity>

              <Text style={{color:"white"}}>
                  Total Points
                </Text>

            </View>


          </View>
          
        </View>
      </View>


        <View style={[styles.card, styles.shadowProp]}>
        <View >
        {walletinfo &&(
            <View>
              <HTMLView style={{marginTop:10,alignSelf:'center'}}
                  value={walletinfo.text_definitions_card_application_title}
                />
              <Text style={{flexWrap:'wrap',marginBottom:5}}>Hello {user}, 
              your subscription is valid until {wallet.expiry_date} </Text>

              <HTMLView style={{marginTop:5}}
                  value={walletinfo.text_points_reset}
                />
                <HTMLView style={{marginTop:5}}
                  value={walletinfo.text_total_points_definition}
                />
                <HTMLView style={{marginTop:5}}
                  value={walletinfo.text_points_balance_definition}
                />

            </View>
            
            
          )}
          
          </View>
        
        </View>

        <View style={[styles.card, styles.shadowProp]}>
        <View>
          </View>
          <Text style={{alignSelf:"center",color:"#D8A623",fontWeight:"700"}}>
          PERSONAL LINK
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={shareid}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />

          <TouchableOpacity style={{marginTop:10,height:40,backgroundColor:'#D8A623'}}
            onPress={() => Alert.alert('Simple Button pressed')}
          >
            <Text style={{color:'white',alignSelf:'center',fontWeight:'500',marginTop:10}}>
              COPY LINK
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop:10,height:40,backgroundColor:'#0c3866'}}
            onPress={() => {setIsVisible(true)}}
          >
            <Text style={{color:'white',alignSelf:'center',fontWeight:'500',marginTop:10}}>
              VIEW ENLISTED PEOPLE
            </Text>
          </TouchableOpacity>


        </View>

      <View>


      <View style={{flexDirection:'row',justifyContent:"space-between"}}>
        <View style={[styles.card, styles.shadowProp,styles.dimension]}>
          <Image
          style={styles.pointsIcon}
          source={require('../assets/trophy.png')}/>
          <Text style={styles.points}>
          {wallet.totalpoints}
          </Text>
          <Text style={styles.pointSubTitle}>
          Total Points
          </Text>
        </View>

        <View style={[styles.card, styles.shadowProp,styles.dimension]}>
          <Image
          style={styles.pointsIcon}
          source={require('../assets/articles_read.png')}/>
          <Text style={styles.points}>
          {wallet.total_articles_read}
          </Text>
          <Text style={styles.pointSubTitle}>
          Articles Read
          </Text>
        </View>
      </View>



      <View style={{flexDirection:'row',justifyContent:"space-between"}}>
        <View style={[styles.card, styles.shadowProp,styles.dimension]}>
          <Image
          style={styles.pointsIcon}
          source={require('../assets/open_book.png')}/>
          <Text style={styles.points}>
                {wallet.reading_points}
          </Text>
          <Text style={styles.pointSubTitle}>
          Reading Points Earned
          </Text>
        </View>

        <View style={[styles.card, styles.shadowProp,styles.dimension]}>
          <Image
          style={{width:40,height:40,alignSelf:'center'}}
          source={require('../assets/pencil.png')}/>
          <Text style={styles.points}>
             {wallet.quiz_points}
          </Text>
          <Text style={styles.pointSubTitle}>
           Quiz Points Earned
          </Text>
        </View>
    </View>



    <View style={{flexDirection:'row',justifyContent:"space-between"}}>
        <View style={[styles.card, styles.shadowProp,styles.dimension]}>
          <Image
          style={styles.pointsIcon}
          source={require('../assets/add_user2.png')}/>
          <Text style={styles.points}>
          {wallet.total_enlistment}
          </Text>
          <Text style={styles.pointSubTitle}>
          Subscribers Enlisted
          </Text>
        </View>

        <View style={[styles.card, styles.shadowProp,styles.dimension]}>
          <Image
          style={styles.pointsIcon}
          source={require('../assets/people.png')}/>
          <Text style={styles.points}>
          {wallet.total_enlistment_points}
          </Text>
          <Text style={styles.pointSubTitle}>
          Enlistment points Earned
          </Text>
        </View>
    </View>

    </View>

    </View>


    )}

      <BottomSheet isVisible={isVisible} 
      containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onPress={()=>{
        setIsVisible(false);
      }}>
        <View style={{ backgroundColor: 'white', height: Dimensions.get('window').width*0.45 }}>
          <Text style={{fontWeight:'bold',marginTop:10}}>Your enlisted users</Text>
          <View style={{flex:1,flexDirection:"row",justifyContent:'space-between',padding:10}}>
             <Text style={{fontWeight:'bold'}}>Name</Text>
             <Text style={{fontWeight:'bold'}}>Zone</Text>
             <Text style={{fontWeight:'bold'}}>Read Status</Text>
          </View>

          <FlatList data={enlister} renderItem={renderEnlisters} />
             <TouchableOpacity style={{backgroundColor:"red",height:40,borderRadius:5}} 
                onPress={()=>{setIsVisible(false)}}>
               <Text style={{color:"#FFFFFF", fontWeight:'500',alignSelf:'center', 
               paddingTop: 10, paddingBottom : 0, paddingRight :10 , paddingLeft : 10 }} >Close</Text>
             
             </TouchableOpacity>
          </View>

      </BottomSheet>

      </ScrollView >
   </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius:5
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
    backgroundColor: '#004d73',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  dimension:{
    width:Dimensions.get('window').width*0.45
  },
  points :{
    fontSize :30  ,
    alignSelf:"center",
    color : '#1c79c0'
    },
  pointsIcon : {
    width:50,
    height:50,
    alignSelf:'center'
  },
  pointSubTitle : {
    alignSelf:"center",
    fontWeight:'300'
  }
});

export default WalletScreen;