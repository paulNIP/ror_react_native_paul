
import React, { useState,useEffect } from "react"; 
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ActivityIndicator,
    StyleSheet, ScrollView
} from "react-native";
import { TextInput,HelperText } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import Strings from "../constants/Strings";
import SnackBar from 'react-native-snackbar-component';
import { getProfile } from "../service/authService";


const EditProfile = () => {


    //new variables
  const [valueSS, setValueSS] = useState('');

      //snack bar message
  const [regError,setRegError]  = useState(false);
  const [regMessage, setRegMessage] = useState('');



  const onChangeSS = (value) => {
    setValueSS(value);
  };


     //form submitted
    const [isSubmit, setIsSubmit] = useState(false);
    const [profile, setProfile] = useState();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {


      const fetchData = async () => {
          const value = await AsyncStorage.getItem('email');
          const data = await getProfile(value);
          setProfile(data);
          setEmail(data.email);
          setName(data.name);
          setPhone(data.phone);
          valueSS(data.zonename);

           

      }
      
      fetchData();
      setIsLoading(false);

    }, []);



    const handleSubmit=()=>{
        //send data online
        setIsSubmit(true);
        setIsLoading(true);

        const data = {
            email:email,
            name:name,
            phone:phone,

        };


        console.log("Feed Back Data",data);

        if(email!==null && phone!==''&&name!==''){
            axios.post(Strings.API_URL+'/user/profile/update', data)
            .then(response => {
            console.log("Resend Response:",response.data);
            if(response.data.status == 1){
                setIsLoading(false);
                setRegMessage('Submitted Successfully');
                setRegError(true)
            }else{
                setIsLoading(false);
                setRegMessage('An error occurred, please try again.');
                setRegError(true)
            }

            })
            .catch(error => {
                setRegMessage('An error occurred, please try again.');
                setRegError(true)

            });

        }else{
            setRegMessage('Kindly Login before Submitting feedback');
            setIsLoading(false);
            setRegError(true)

        }
        
        
    }


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
      




  return (


        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >

       

        <View style={{marginTop:40}}>
               
                {/* Inqiury / Query Form */}
                    <View>
                        <View style={{marginBottom:20}}>
                            <TextInput
                            label="Full Names"
                        onChangeText={newText => setName(newText)}
                        placeholder={name}
                        left={<TextInput.Icon icon="account-circle" />}
                        />
                        {isSubmit && name=== "" ? <HelperText type="error" visible={true}>
                            Full name is Required
                            </HelperText> : null} 
                        </View>

                        <View style={{marginBottom:20}}>
                            <TextInput
                            label="Email"
                        onChangeText={newText1 => setEmail(newText1)}
                        placeholder={email}
                        left={<TextInput.Icon icon="email" />}
                        />
                        {isSubmit && email === "" ? <HelperText type="error" visible={true}>
                            Email is Required
                            </HelperText> : null} 
                        </View>

                        <View style={{marginBottom:20}}>
                            <TextInput
                            label="Phone"
                        onChangeText={newText2 => setPhone(newText2)}
                        placeholder={phone}
                        left={<TextInput.Icon icon="phone" />}
                        />
                        {isSubmit && phone === "" ? <HelperText type="error" visible={true}>
                            Phone number is Required
                            </HelperText> : null} 
                        </View>

                        <View style={{marginBottom:20}}>
                                <Dropdown
                                    label="Select Zone (Optional)"
                                    data={zones}
                                    value={valueSS}
                                    onChange={onChangeSS}
                                    
                                />
                                </View>



                        <View style={{marginBottom:20}}>
                        <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:'#D8A623',
                        borderRadius:5,height:45}}>
                            <Text style={{alignSelf:'center',color:'white',verticalAlign:'middle',marginTop:15}}>UPDATE PROFILE</Text>
                        </TouchableOpacity>
                            
                        </View>
                    </View>

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
            color="#C00"
            size="large"
          />
          </View>
        )}

              {/* failed Registration snack bar */}
        <SnackBar visible={regError} textMessage={regMessage} 
        actionHandler={()=>{setRegError(false);}} actionText="OKAY"/>

        

            
        </ScrollView>


  );
};


const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor:'#F6F6F6',
    }, 
    scrollView: {
        marginHorizontal: 10,
      },
    header: { 
        fontSize: 30, 
        fontWeight: "bold", 
        marginBottom: 20, 
        color: "green", 
        textAlign: "center", 
    }, 
    subheader: { 
        fontSize: 20, 
        fontWeight: "bold", 
        marginBottom: 20, 
        textAlign: "center", 
    }, 
    itemContainer: { 
        marginBottom: 15, 
        padding: 10, 
        backgroundColor: "white", 
        borderRadius: 5, 
        elevation: 3, 
    }, 
    itemTouchable: { 
        borderRadius: 10, 
        overflow: "hidden", 
    }, 
    itemTitle: { 
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#333", 
    }, 
    itemContent: { 
        marginTop: 10, 
        fontSize: 14, 
        color: "#666", 
    }, 
}); 

export default EditProfile;