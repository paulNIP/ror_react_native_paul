import React, { useEffect, useState ,useRef} from 'react';
import { Icon,BottomSheet } from '@rneui/themed';
import {Dimensions,FlatList,TouchableOpacity,Image, Linking} from 'react-native';
import {Overlay } from '@rneui/themed';
import { Button,ListItem } from '@rneui/themed';
import { TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import SnackBar from 'react-native-snackbar-component';


// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,Share,Modal
} from 'react-native';
import Video from 'react-native-video';
import SelectDropdown from 'react-native-select-dropdown';
import {  getTVProgramme } from '../service/liveTvService';
import { useNetInfo } from "@react-native-community/netinfo";
import { getStripeKeys } from '../utils/Utils';

const windowHeight = Dimensions.get('window').height*0.7;
const windowWidth = Dimensions.get('window').width;



const VideoDetail= ({ route, navigation }) => {

    const { videoid } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [visible00, setVisible00] = useState(false);
    const [isVisible0, setIsVisible0] = useState(false);
    const [isVisible00, setIsVisible00] = useState(false);
    const { type, isConnected } = useNetInfo();
    const [formattedValue, setFormattedValue] = useState("");
    const [countryCode, setCountryCode] = useState('');
    const [value, setValue] = useState("");
    const [city, setCity] = useState("");

    const [index, setIndex] = useState(1);
    const [phone, setPhone] = useState('');
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [publishableKey, setPublishableKey] = useState('');
    const { confirmPayment } = useStripe();

    const fetchPublishableKey = async () => {
      const key = await getStripeKey(); // fetch key from your server here
      setPublishableKey(key);
    };

    const toggleOverlay = () => {
        setVisible(!visible);
      };

      const toggleOverlay2 = () => {
        setVisible00(!visible00);
      };

    const [tvProgram, setTvProgram] = useState();
    const [related, setRelated] = useState();
    const [category, setCategory] = useState();
    const [zoneSS, setZoneSS] = useState('');
    const [volunteerSS, setVolunteerSS] = useState('');
    const [internetCheck, setInternetCheck] = useState(false);

    const onChangeZone = (value) => {
      setZoneSS(value);
    };

    const onChangeVolunteer = (value) => {
        setVolunteerSS(value);
      };

    const save_volunteer = (names, email, countrycode, phoneno, 
    country, city, option, zoneSS) => {

        const data ={
            "names":names,
            "email":email,
            "country":country,
            "city":city,
            "country_code":countrycode,
            "phoneno":phoneno,
            "option":option,
            "zone":zoneSS
        }

        axios.post(url,data)
            .then((res) => {
              resolve(res.data);
              console.log("Volunteer data",res.data);
          })
            .catch((err) => {
              reject(err)
          });

    };

    const volunteerOption = [
        {
            value: "abavz",
            label: "Aba  Zone"
        },

    ];

    const zones = [
      {
          value: "abavz",
          label: "Aba  Zone"
      },
      {
          value: "abeakutamc",
          label: "Ministry Center Abeokuta"
      },
      {
          value: "abujamc",
          label: "Ministry Center Abuja"
      },
      {
          value: "abujavz",
          label: "Abuja  Zone"
      },
      {
          value: "accraz",
          label: "Accra Zone"
      },
      {
          value: "australia",
          label: "Australia \/South  Pacific"
      },
      {
          value: "beninvz2",
          label: "Benin Zone 2"
      },
      {
          value: "beninz1",
          label: "Benin Zone 1"
      },
      {
          value: "blwchurchzone",
          label: "BLW CHURCH ZONE"
      },
      {
          value: "blwnec",
          label: "BLW GHANA SUB-ZONE C"
      },
      {
          value: "blwned",
          label: "BLW  GHANA SUB ZONE D"
      },
      {
          value: "blwnee",
          label: "BLW GHANA SUB-ZONE E"
      },
      {
          value: "blwnef",
          label: "BLW GHANA SUB-ZONE F"
      },
      {
          value: "blwoup22",
          label: "BLW WALES GROUP"
      },
      {
          value: "blwugandaz",
          label: "BLW Uganda Zone"
      },
      {
          value: "capne1",
          label: "Cape Town Zone 1"
      },
      {
          value: "capne2",
          label: "Cape Town Zone 2"
      },
      {
          value: "ceadsp",
          label: "CE Amsterdam-DSP"
      },
      {
          value: "cechad",
          label: "CE Chad"
      },
      {
          value: "ceidia45",
          label: "CE India Zone"
      },
      {
          value: "cgm",
          label: "CHURCH GROWTH INTL"
      },
      {
          value: "dscsz",
          label: "DSC Sub- Zone"
      },
      {
          value: "durone",
          label: "Durban Zone"
      },
      {
          value: "easterneuropevr",
          label: "Eastern Europe Region"
      },
      {
          value: "edonorthcentralvz",
          label: "Edo North & Central Zone"
      },
      {
          value: "ewce3b",
          label: "EWCA ZONE 3 B"
      },
      {
          value: "ewcvz1",
          label: "EWC Zone 1 "
      },
      {
          value: "ewcvz2",
          label: "EWC Zone 2 "
      },
      {
          value: "ewcvz3",
          label: "EWC Zone 3"
      },
      {
          value: "ewcvz4",
          label: "EWC Zone 4 "
      },
      {
          value: "ewcvz5",
          label: "EWC Zone 5 "
      },
      {
          value: "ewcvz6",
          label: "EWC Zone 6"
      },
      {
          value: "ibz1",
          label: "Ibadan Zone 1"
      },
      {
          value: "intate24",
          label: "International Missons for South East Asia\u00a0Directorate"
      },
      {
          value: "Islt",
          label: "ISLT"
      },
      {
          value: "ism",
          label: "ISM"
      },
      {
          value: "ismuganda",
          label: "ISM UGANDA"
      },
      {
          value: "itlice",
          label: "ITL OFFICE"
      },
      {
          value: "kenyaz",
          label: "Kenya Zone"
      },
      {
          value: "lcm",
          label: "LW CELL MINISTRY"
      },
      {
          value: "lovoup11",
          label: "Loveworld Ethiopia Group"
      },
      {
          value: "lovoup19",
          label: "Loveworld  Namibia Group"
      },
      {
          value: "lovoup55",
          label: "Loveworld Ireland Group"
      },
      {
          value: "lovoup57",
          label: "Loveworld Canada Group"
      },
      {
          value: "lsza",
          label: "Lagos Sub Zone A"
      },
      {
          value: "lszb",
          label: "Lagos Sub Zone B"
      },
      {
          value: "lszc",
          label: "Lagos Sub Zone C"
      },
      {
          value: "lvz",
          label: "CELVZ"
      },
      {
          value: "lwcg1",
          label: "BLW Cameroon Sub-Group 1"
      },
      {
          value: "lwcg2",
          label: "BLW CAMEROON SUB-GROUP 2"
      },
      {
          value: "lwcg3",
          label: "BLW Cameroon Sub-Group 3"
      },
      {
          value: "lwghanaza",
          label: "Loveworld  Ghana Zone A"
      },
      {
          value: "lwghanazb",
          label: "Loveworld Ghana Zone B"
      },
      {
          value: "lwgradnet",
          label: "LW GRADUATE NETWORK"
      },
      {
          value: "lwiers52",
          label: "LW International Chapters"
      },
      {
          value: "lwkenyaz",
          label: "Loveworld  Kenya Zone"
      },
      {
          value: "lwkids",
          label: "CHILDREN\\'S CHURCH"
      },
      {
          value: "lwnrus",
          label: "LW North Cyprus"
      },
      {
          value: "lwrdio42",
          label: "LW RADIO"
      },
      {
          value: "lwsaza",
          label: "Loveworld SA Zone A"
      },
      {
          value: "lwsazb",
          label: "Loveworld SA Zone B"
      },
      {
          value: "lwsazc",
          label: "Loveworld SA Zone C"
      },
      {
          value: "lwsazd",
          label: "Loveworld SA Zone D"
      },
      {
          value: "lwsaze",
          label: "Loveworld SA Zone E"
      },
      {
          value: "lwttry90",
          label: "LW TELEVISION MINISTRY"
      },
      {
          value: "lwukza",
          label: "Loveworld UK Zone A"
      },
      {
          value: "lwukzb",
          label: "Loveworld UK Zone B"
      },
      {
          value: "lwusag4",
          label: "LW USA Group 4"
      },
      {
          value: "lwusagrp1",
          label: "LW USA GROUP 1"
      },
      {
          value: "lwusagrp2",
          label: "LW USA GROUP 2"
      },
      {
          value: "lwusagrp3",
          label: "LW USA GROUP 3"
      },
      {
          value: "lwza",
          label: "Loveworld Zone A"
      },
      {
          value: "lwzb",
          label: "Loveworld  Zone B"
      },
      {
          value: "lwzc",
          label: "Loveworld  Zone C"
      },
      {
          value: "lwzd",
          label: "Loveworld Zone D"
      },
      {
          value: "lwze",
          label: "Loveworld Zone E"
      },
      {
          value: "lwzf",
          label: "Loveworld Zone F"
      },
      {
          value: "lwzg",
          label: "Loveworld Zone G"
      },
      {
          value: "lwzh",
          label: "Loveworld Zone H"
      },
      {
          value: "lwzi",
          label: "Loveworld  Zone I"
      },
      {
          value: "lwzj",
          label: "Loveworld  Zone J"
      },
      {
          value: "lwzk",
          label: "Loveworld  Zone K"
      },
      {
          value: "lwzl",
          label: "Loveworld  zone L"
      },
      {
          value: "lz1",
          label: "Lagos Zone 1"
      },
      {
          value: "lz2",
          label: "Lagos Zone 2"
      },
      {
          value: "lz3",
          label: "Lagos Zone 3"
      },
      {
          value: "lz4",
          label: "Lagos Zone 4"
      },
      {
          value: "lz5",
          label: "Lagos Zone 5"
      },
      {
          value: "lz6",
          label: "Lagos Zone 6"
      },
      {
          value: "mcc",
          label: "Ministry Center Calabar"
      },
      {
          value: "middleeast",
          label: "Middle East  & South East Asia Region"
      },
      {
          value: "midwestz",
          label: "Mid West Zone "
      },
      {
          value: "newdia43",
          label: "New Media"
      },
      {
          value: "newia144",
          label: "New Media1"
      },
      {
          value: "nncvz1",
          label: "NC Zone 1"
      },
      {
          value: "nncvz2",
          label: "NC Zone 2"
      },
      {
          value: "nnevz1",
          label: "NE Zone 1"
      },
      {
          value: "nnwvz2",
          label: "NW Zone 2"
      },
      {
          value: "nsevz1",
          label: "SE Zone 1"
      },
      {
          value: "nsevz2",
          label: "SS ZONE 3"
      },
      {
          value: "nssvz1",
          label: "SS Zone 1"
      },
      {
          value: "nssvz2",
          label: "SS Zone 2"
      },
      {
          value: "nswvirualz3",
          label: "SW Zone 3"
      },
      {
          value: "nswvz1",
          label: "SW Zone 1"
      },
      {
          value: "nswvz2",
          label: "SW Zone 2"
      },
      {
          value: "nwz1",
          label: "NW Zone 1"
      },
      {
          value: "offial69",
          label: "OFFICIAL"
      },
      {
          value: "onitshaz",
          label: "Onitsha Zone"
      },
      {
          value: "ottz",
          label: "Ottawa Zone"
      },
      {
          value: "pcdl",
          label: "PCDL"
      },
      {
          value: "phz1",
          label: "Port Harcourt Zone 1"
      },
      {
          value: "phz2",
          label: "Port Harcourt Zone 2"
      },
      {
          value: "phz3",
          label: "Port Harcourt Zone 3"
      },
      {
          value: "qubators",
          label: "QUBATORS"
      },
      {
          value: "quebecvz",
          label: "Quebec Zone"
      },
      {
          value: "reon",
          label: "REON"
      },
      {
          value: "rin",
          label: "RIN"
      },
      {
          value: "rorion",
          label: "ROR Global Production"
      },
      {
          value: "sales",
          label: "sales"
      },
      {
          value: "savz2",
          label: "SA Zone 2"
      },
      {
          value: "savz3",
          label: "SA Zone 3"
      },
      {
          value: "savz4",
          label: "SA Zone 4"
      },
      {
          value: "saz1",
          label: "SA Zone 1"
      },
      {
          value: "saz5",
          label: "SA Zone 5"
      },
      {
          value: "sez3",
          label: "SE Zone 3"
      },
      {
          value: "som",
          label: "LoveWorld SOM"
      },
      {
          value: "southamericavr",
          label: "South America Region"
      },
      {
          value: "swzne4",
          label: "SW Zone 4"
      },
      {
          value: "swzne5",
          label: "SW Zone 5"
      },
      {
          value: "teens",
          label: "TEENS MINISTRY"
      },
      {
          value: "texasz1",
          label: "USA Region 3"
      },
      {
          value: "texasz2",
          label: "Dallas Zone"
      },
      {
          value: "tni",
          label: "TNI"
      },
      {
          value: "torz",
          label: "Toronto Zone"
      },
      {
          value: "ukszonec",
          label: "BLW UK SUB-ZONE C"
      },
      {
          value: "ukvz1",
          label: "UK Zone 1 (UK Region 2)"
      },
      {
          value: "ukvz3",
          label: "UK Zone 3 (UK Region 2)"
      },
      {
          value: "ukvz4",
          label: "UK Zone 4 (Region 1)"
      },
      {
          value: "ukz1",
          label: "UK Zone 1 (UK Region 1)"
      },
      {
          value: "ukz2",
          label: "UK Zone 2 (UK Region 1)"
      },
      {
          value: "ukz3",
          label: "UK Zone 3 (UK Region 1)"
      },
      {
          value: "ukz4",
          label: "UK Zone 4 (UK Region 2)"
      },
      {
          value: "ukz4dspr1",
          label: "UKzone4 DSP region 1"
      },
      {
          value: "usaregion3",
          label: "USA REGION 3"
      },
      {
          value: "usavz1",
          label: "USA Zone 1 ( Region 1)"
      },
      {
          value: "usavz2",
          label: "USA Zone 2 ( Region 1)"
      },
      {
          value: "usaz1r2",
          label: "USA Zone 1 (Region 2)"
      },
      {
          value: "warrimc",
          label: "Ministry Center Warri"
      },
      {
          value: "wevz1",
          label: "Western Europe Zone 1"
      },
      {
          value: "wevz2",
          label: "Western Europe Zone 2"
      },
      {
          value: "wevz3",
          label: "Western Europe Zone 3"
      },
      {
          value: "wevz4",
          label: "Western Europe Zone 4"
      },
      {
          value: "xtreme",
          label: "Xtreme"
      },
      {
          value: "yolnda",
          label: "YOLANDA1"
      }
  ];

  const partner =async(amount)=>{
    const resp =await getStripeKeys(amount);
    console.log("Stripe datata",resp);

  }

    useEffect(() => {
            const fetchData = async () => {
            const data = await getTVProgramme(videoid);
            setTvProgram(data);
            setRelated(data[0].related_videos);
            setCategory(data[0].cat);
            console.log("Related Video details",data[0].related_videos);

        }
        fetchData();
        setIsLoading(false);
        navigation.setOptions({
          title: category,
        });

  
    }, [navigation]);







    const [text, setText] = React.useState("");

    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    const url = 'https://play.google.com/store/search?q=rhapsody+of+realities+app&c=apps&hl=en&gl=US';
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              ('Rhapsody of Realities Official'+ '\n'+'Read, watch & Listen to Rhapsody of Realities all within the new mobile app'+''+ url )
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

      const [phoneNumber, setphoneNumber] = useState('');
      const phoneInput = useRef(null);
      const buttonPress = () => {
        Alert.alert(phoneNumber);
      };

      const renderVideoItem = ({ item }) => {
        const videoid=item.videoid;

        return (
          <View >
             <TouchableOpacity onPress={()=>{navigation.push('VideoDetail',{videoid:item.videoid})}}>
                    <ListItem bottomDivider>
                       <Image
                         style={styles.image}
                         source={{uri: item.thumbnail}} 
                         resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
                       />
                       <ListItem.Content>
                         <ListItem.Title>{item.title}</ListItem.Title>
                         <ListItem.Subtitle style={{color:'#999999'}}>{item.description}</ListItem.Subtitle>
                       </ListItem.Content>
                    </ListItem>
                    </TouchableOpacity>
         </View>
        );
      };



  return (

    // <StripeProvider
    //   publishableKey={publishableKey}
    //   merchantIdentifier="merchant.com.rhapsody.dailydevotionals" // required for Apple Pay
    //   urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    // >

    <SafeAreaView >
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
      
      {tvProgram && (
        <View>


        <Video
          source={{ uri: tvProgram[0].url }}
          style={styles.video}
          controls={true}
          resizeMode="contain"
        />


        <View style={{justifyContent:'space-between'}}>
                <Text style={{marginLeft:10,fontWeight:'bold'}}>{tvProgram[0].title}</Text>
                <Text style={{marginLeft:10,color:'#999999'}}>{tvProgram[0].description}</Text>
        </View>
        

        <View style={{  borderRadius: 5, overflow: "hidden",
        flexDirection:'row',flexWrap:'space-around',justifyContent:'space-evenly',marginTop:15,marginBottom:15 }}>
          <TouchableOpacity onPress={toggleOverlay}>
            <Icon style={{ alignSelf:'center'}} name="hand-back-right" type="material-community" color="grey" />
            <Text>volunteer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleOverlay2}>
            <Icon style={{ alignSelf:'center'}} name="plus-circle" type="material-community" color="grey" />
            <Text>Pledge</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => 
          {
            Linking.openURL('https://give.rhapsodyofrealities.org/ref/official');
          }}>
            <Icon style={{ alignSelf:'center'}} name="credit-card" type="material-community" color="grey" />
            <Text>give</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onShare }>
            <Icon style={{ alignSelf:'center'}} name="share" type="material-community" color="grey" />
            <Text>share</Text>
          </TouchableOpacity>

        </View>
        <View style={{flexDirection: 'row'}}>
          {/*To set the FirstScreen*/}
          <TouchableOpacity
            style={{height:40,backgroundColor:"grey",width:Dimensions.get('window').width,
            marginTop:10,alignContent:'center',justifyContent:'center'}}
            onPress={() => {}}>
            <Text style={{alignSelf:'center'}}>RELATED</Text>
          </TouchableOpacity>

        </View>

        <View style={{backgroundColor: '#ffffff'}}>
          {/* flat list of related */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList data={related} renderItem={renderVideoItem} />
          </ScrollView>
                
              
        </View>


       <BottomSheet modalProps={{}} isVisible={isVisible0}>

        <TouchableOpacity onPress={() => setIsVisible0(false)}>
       
        <View style={{backgroundColor:'white'}}>

          <View style={{marginTop:5,marginLeft:20,marginRight:20}}>

            <Text style={{ marginTop:15, marginBottom:15}}>Give ...</Text>

            <View style={styles.dropdowncontainer}>
                        <Dropdown
                            label="Choose Give Option"
                            enableSearch
                            data={zones}
                            value={zoneSS}
                            onChange={onChangeZone}
                            
                        />
                  </View>

              <View style={styles.dropdowncontainer}>
                        <Dropdown
                            label="Zone"
                            enableSearch
                            data={zones}
                            value={zoneSS}
                            onChange={onChangeZone}
                            
                        />
              </View>

            <TextInput
                label="Enter amount to give in USD"
                value={text}
                onChangeText={text => setText(text)}
                style={{marginTop:5, marginBottom:5}}
                />

            <Button
              title="Give Now"
              onPress={() => {partner(10);}}
              style={{marginTop:5, marginBottom:5}}
            />

            </View>

            <TouchableOpacity>
                <Text style={{color:"#eee",alignSelf:'center'}}>Use other payment means</Text>
            </TouchableOpacity>

            <ScrollView> 

            {/* <View style={{marginLeft:20,marginRight:20,marginBottom:10,borderRadius:5,marginTop:10,backgroundColor:'#E5E4E2'}}>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Country</Text>
                    <Text style={{color:'grey'}}>NIGERIA</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Account Name</Text>
                    <Text style={{color:'grey'}}>RHAPSODY OF REALITIES MISSION</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Bank Name</Text>
                    <Text style={{color:'grey'}}>GT BANK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:4}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>0173233796</Text>
                </View>
            </View>

            <View style={{marginLeft:20,marginRight:20,marginBottom:10,borderRadius:5,marginTop:10,backgroundColor:'#E5E4E2'}}>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Country</Text>
                    <Text style={{color:'grey'}}>UK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Account Name</Text>
                    <Text style={{color:'grey'}}>BELIEVERS LOVEWORLD</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Bank Name</Text>
                    <Text style={{color:'grey'}}>BARCLAYS BANK UK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:4}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:4}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:4}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
            </View>

            <View style={{marginLeft:20,marginRight:20,marginBottom:10,borderRadius:5,marginTop:5,backgroundColor:'#E5E4E2'}}>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Country</Text>
                    <Text style={{color:'grey'}}>UK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account Name</Text>
                    <Text style={{color:'grey'}}>BELIEVERS LOVEWORLD</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Bank Name</Text>
                    <Text style={{color:'grey'}}>BARCLAYS BANK UK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
            </View> */}

            {/* <View style={{marginLeft:20,marginRight:20,marginBottom:10,borderRadius:5,marginTop:5,backgroundColor:'#E5E4E2'}}>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Country</Text>
                    <Text style={{color:'grey'}}>U.S.A</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account Name</Text>
                    <Text style={{color:'grey'}}>GLOBAL DISTRIBUTORS NETWORK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Bank Name</Text>
                    <Text style={{color:'grey'}}>US BANK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>130124243531</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Branch Code.</Text>
                    <Text style={{color:'grey'}}>0412025825</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Swift Code.</Text>
                    <Text style={{color:'grey'}}>USBKUS441MT</Text>
                </View>
            </View>

            <View style={{marginLeft:20,marginRight:20,marginBottom:10,borderRadius:5,marginTop:5,backgroundColor:'#E5E4E2'}}>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Country</Text>
                    <Text style={{color:'grey'}}>SOUTH AFRICA</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account Name</Text>
                    <Text style={{color:'grey'}}>LOVEWORLD PUBLISHING PTY</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Bank Name</Text>
                    <Text style={{color:'grey'}}>STANDARD BANK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>420283706</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Branch Code.</Text>
                    <Text style={{color:'grey'}}>018005</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Swift Code.</Text>
                    <Text style={{color:'grey'}}>SBZAZAJJ</Text>
                </View>
            </View> */}
            </ScrollView>

        
        </View>
        </TouchableOpacity>
        

       </BottomSheet>

       <Overlay ModalComponent={Modal} fullScreen={false} 
              isVisible={visible} 
              onBackdropPress={toggleOverlay} overlayStyle={{width:windowWidth*0.9,height:windowHeight}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#778899'}}>
                  
                    <Text style={{alignSelf:'center',marginTop:10,marginBottom:10}}>
                        Join a volunteer Network
                    </Text>
                </View>
                <Text style={{marginTop:10,marginBottom:10}}>
                        CHOOSE VOLUNTEER OPTIONS BELOW:
                    </Text>
                    <View style={styles.dropdowncontainer}>
                        <Dropdown
                            label="Choose Option"
                            enableSearch
                            data={volunteerOption}
                            value={volunteerSS}
                            onChange={onChangeVolunteer}
                            
                        />
                  </View>

                    <Text style={{marginTop:10,marginBottom:10}}>
                        PHONE NUMBER:
                    </Text>

                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        layout="first"
                        onChangeText={(text) => {
                        setPhone(text);
                        setCountryCode(phoneInput.current?.getCountryCode() || '');
                        }}
                        onChangeFormattedText={(text) => {
                        setFormattedValue(text);
                        }}
                        withDarkTheme
                        withShadow
                        autoFocus
                        containerStyle={{
                        width:Dimensions.get('window').width,marginBottom:10
                        }}
                        
                    />



                  <TextInput
                        label="City"
                        value={text}
                        onChangeText={text => setCity(text)}
                        style={{marginTop:10,marginBottom:10}}
                      />



                    <Text style={{marginTop:10,marginBottom:10}}>
                        SELECT ZONE:
                    </Text>
                    <View style={styles.dropdowncontainer}>
                        <Dropdown
                            label="Select Zone (Optional)"
                            enableSearch
                            data={zones}
                            value={zoneSS}
                            onChange={onChangeZone}
                            
                        />
                  </View>

                <Button
                  onPress={()=>{

                    // check network availabilty
                    if(isConnected===true){
                        //save volunteer
                        save_volunteer(fullnames, email, countryCodePicker.getSelectedCountryCode(), phoneno, 
                                            countryCodePicker.getSelectedCountryName(), city, option, zoneSS);


                    }else{
                        //Internet Error Message 
                        setInternetCheck(true);
                    }



                  }}
                  title="SUBMIT"
                  color="#D8A623"
                  style={{marginTop:10,marginBottom:10}}
                />

                </ScrollView>


        </Overlay>

        <Overlay ModalComponent={Modal} fullScreen={false} 
              isVisible={visible00} 
              onBackdropPress={toggleOverlay2} overlayStyle={{width:windowWidth*0.9,height:windowHeight}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#007CC0'}}>
                  
                    <Text style={{alignSelf:'center',marginTop:10,marginBottom:10}}>
                        Pledge Form
                    </Text>
                </View>
                <Text style={{marginTop:10,marginBottom:10}}>
                        CHOOSE PLEDGE OPTION BELOW:
                    </Text>
                    <View style={styles.dropdowncontainer}>
                        <Dropdown
                            label="Pledge Option"
                            enableSearch
                            data={zones}
                            value={zoneSS}
                            onChange={onChangeZone}
                            
                        />
                  </View>

              <TextInput
                    label="Type pledge amount"
                    value={text}
                    onChangeText={text => setText(text)}
                    style={{marginTop:10,marginBottom:10}}
                  />

                <Text style={{marginTop:10,marginBottom:10}}>
                        Choose currency below:
                    </Text>
                    <View style={styles.dropdowncontainer}>
                        <Dropdown
                            label="Currency"
                            enableSearch
                            data={zones}
                            value={zoneSS}
                            onChange={onChangeZone}
                            
                        />
                  </View>

                    <Text style={{marginTop:10,marginBottom:10}}>
                        PHONE NUMBER:
                    </Text>


                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="IN"
                  layout="first"
                  withShadow
                  autoFocus
                  containerStyle={styles.phoneContainer}
                  textContainerStyle={styles.textInput}
                  onChangeFormattedText={text => {
                    setphoneNumber(text);
                  }}
                />


                  <TextInput
                        label="City"
                        value={text}
                        onChangeText={text => setText(text)}
                        style={{marginTop:10,marginBottom:10}}
                      />



                    <Text style={{marginTop:10,marginBottom:10}}>
                        SELECT ZONE:
                    </Text>
                    <View style={styles.dropdowncontainer}>
                        <Dropdown
                            label="Zone (Optional)"
                            enableSearch
                            data={zones}
                            value={zoneSS}
                            onChange={onChangeZone}
                            
                        />
                    </View>

                <Button
                  onPress={()=>{}}
                  title="SUBMIT PLEDGE"
                  color="#D8A623"
                  style={{marginTop:10,marginBottom:10}}
                />

                </ScrollView>


            </Overlay>

          </View>

        )}

        {/* Network snack bar */}
        <SnackBar visible={internetCheck} textMessage="Failed  Check Your Internet Conncetion" 
            actionHandler={()=>{setInternetCheck(false);}} actionText="OKAY"/>
      
      
    </SafeAreaView>
    // </StripeProvider>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
    },
    paragraphStyle: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonStyle: {
      alignItems: 'center',
      backgroundColor: '#808080',
      padding: 10,
      margin: 2,
    },
    dropdown3BtnStyle: {
      width: '100%',
      paddingHorizontal: 0,
      borderWidth: 0,
      borderRadius: 4,
      marginTop:5,
      marginBottom:5,
      borderColor: '#444',
    },

    video: {
        alignSelf: 'center',
        width: windowWidth,
        height: Dimensions.get('window').height*0.3,
      },
    buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    },
    phoneContainer: {
      width: '100%',
      height: 50,
    },
    button: {
      marginTop: 30,
      width: '75%',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'green',
    },
    textInput: {
      paddingVertical: 0,
    },
    image: {
      width:Dimensions.get('window').width*0.2,
      height: Dimensions.get('window').height*0.1,
      borderRadius: 15
    },

    centered: { 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center", 
    }, 
    title: { 
      marginVertical: 2, 
    }, 
    subtitle: { 
      fontSize: 14, 
    }, 
    dropdowncontainer:{
      width:'100%',
      marginBottom:10
   },


  });

export default VideoDetail;