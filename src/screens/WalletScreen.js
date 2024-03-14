import React ,{useEffect,useState} from "react";
import {View, Text,Button, SafeAreaView,ScrollView,Alert,FlatList,
   TextInput,StyleSheet,TouchableOpacity,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import { getWallet } from "../service/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

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




  useEffect(() => {

      const fetchData = async () => {
          const email= await AsyncStorage.getItem('email');
          const data = await getWallet(email);
          setWallet(data);

          setCopiesSponsored(data.CopiesSponsored);
          setUser(data.fullnames);
          setStatus(data.status);
          setTotalPoints(data.totalpoints);
          setPointsBalance(data.PointsBalance);
          setShareid('rhapsodysubscriptions.org/me/'+data.shareid);

      }
      fetchData();

    }, []);





  return (
    <SafeAreaView >
    <ScrollView style={{marginLeft:16,marginRight:16,marginTop:10}}showsVerticalScrollIndicator={false}>

    {wallet &&(
      <View>
      <View style={[styles.card3, styles.shadowProp]}>
      <View style={{backgroundColor:'#004d73',height:Dimensions.get('window').height*0.2,justifyContent:'center',alignContent:'center'}}>
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
                <TouchableOpacity style={{marginTop:10,height:40,backgroundColor:'#03c0c1',borderRadius:1, width : 150, marginBottom : 15 }}
                onPress={() => Alert.alert('Simple Button pressed')} >
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



        {/*<TouchableOpacity style={{marginTop:10,marginBottom:10,height:40,backgroundColor:'#49c0b6'}}*/}
        {/*    onPress={() => Alert.alert('Simple Button pressed')}*/}
        {/*  >*/}
        {/*    <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',marginTop:10}}>*/}
        {/*      REDEEM POINTS BALANCE*/}
        {/*    </Text>*/}
        {/*</TouchableOpacity>*/}


        <View style={[styles.card, styles.shadowProp]}>
        <View>
          
          <Text style={{alignSelf:"center",color:"#D8A623",fontWeight:"bold"}}>
          RHAPSODY SUBSCRIPTION
          </Text>
          <Text style={{flexWrap:'wrap',marginBottom:5}}>Hello {user}, your subscription is valid until {wallet.expiry_date} </Text>
          <Text style={{fontWeight:'bold',flexWrap:'wrap',marginBottom:5}}>Your points have been reset in preparation for the new year 2024! </Text>
          <Text style={{flexWrap:'wrap',marginBottom:5}}>Total Points - is the total point you get from subscription, reading, enlisting others and quiz points
          80% of yout total points is instantly converted to copies of Rhapsody of realities didtributed to others
          on your behalf. The balanace is what is called POINTS BALANCE </Text>
          <Text style={{flexWrap:'wrap',marginBottom:5}}>Points Balance - are Redeemable points </Text>
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
            onPress={() => Alert.alert('Simple Button pressed')}
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