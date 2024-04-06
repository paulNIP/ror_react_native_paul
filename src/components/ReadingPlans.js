import React, { useState,useEffect, useRef } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions, 
  TextInput, TouchableOpacity,Alert,Modal, Image,FlatList,Button } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from '@rneui/themed';
import Carousel from 'react-native-snap-carousel';
import {Overlay } from '@rneui/themed';

import * as RNIap from 'react-native-iap';
import {
    decode,
    verify,
    isSignatureValid,
    SignJWT,
    thumbprint,
    sha256ToBase64,
    EncryptJwe,
    getRemoteJWKSet,
  } from '@pagopa/io-react-native-jwt';
  
  import { generate, sign, getPublicKey,CryptoError } from '@pagopa/io-react-native-crypto';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');


import styles from '../screens/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const windowHeight = Dimensions.get('window').height*0.4;
const windowWidth = Dimensions.get('window').width*0.8;


// SKU RhapsodyReader




const ReadingPlans = () => {

   const carouselRef = useRef(null)
   const [visible, setVisible] = useState(false);
   const [isEligibleForFreeTrial, setIsEligibleForFreeTrial] = useState(false);
   const [isSubscribed, setIsSubscribed] = useState(false);
   const [voucher, setVoucher] = useState();
   const [skuProduct,setSkuProduct] = useState();
   const [subscriptionPackage,setSubscriptionPackage] = useState();

   
   

   
   const [visibleError, setVisibleError] = useState(false);
   const [errorMessage,setErrorMessage] = useState();

   useEffect(() => {
    checkFreeTrialEligibility();
    checkSubscriptionStatus();
  }, []);

  const checkFreeTrialEligibility = async () => {
    try {
      // Get the available products
      const products = await RNIap.getProducts(['your_free_trial_product_id']);
      
      // Check if the user is eligible for a free trial
      const freeTrialProduct = products.find(product => product.productId === 'your_free_trial_product_id');

      if (freeTrialProduct && freeTrialProduct.isFreeTrialEligible) {
        setIsEligibleForFreeTrial(true);
      } else {
        setIsEligibleForFreeTrial(false);
      }
    } catch (error) {
      console.warn('Error checking free trial eligibility:', error);
    }
  };

  const checkSubscriptionStatus = async () => {
    try {
      // Get the available products
      const products = await RNIap.getProducts(['your_subscription_product_id']);
      
      // Check if the user is subscribed
      const subscriptionProduct = products.find(product => product.productId === 'your_subscription_product_id');

      if (subscriptionProduct && subscriptionProduct.isSubscribed) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    } catch (error) {
      console.warn('Error checking subscription status:', error);
    }
  };


  const purchaseSubscription = async () => {
    try {
      // Initiate the subscription purchase
      const purchase = await RNIap.requestSubscription('your_subscription_product_id');
      
      // Handle the purchase response accordingly
    //   console.log('Subscription purchased successfully:', purchase);
      
      // Optionally, update the UI to reflect the subscription status
      setIsSubscribed(true);
    } catch (error) {
      console.warn('Error purchasing subscription:', error);
    }
  };


  const startFreeTrial = async () => {
    try {
      // Implement logic to initiate the free trial for the user
      // This could involve making a purchase using react-native-iap
      // and handling the purchase response accordingly.
      // For simplicity, this example assumes a successful free trial initiation.
    //   console.log('Free trial started successfully!');
    } catch (error) {
      console.warn('Error starting free trial:', error);
    }
  };

   const toggleOverlay = () => {
    setVisible(!visible);
   };

   const toggleErrorOverlay = () => {
    setVisibleError(!visibleError);
   };



    const [lista, setLista] = useState([
        {
            title:"O Justiceiro",
            description: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_2_99.png'),
            img_header: require('../assets/basic_2_header_99.png')
        },
        {
            title:"Bad Boys for life",
            description: "Terceiro episódio das histórias dos policiais Burnett (Martin Lawrence) e Lowrey (Will Smith), que devem encontrar e prender os mais perigosos traficantes de drogas da cidade.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_4_header.png'),
            img_header: require('../assets/basic_4.png')
        },
        {
            title:"Viúva Negra",
            description: "Em Viúva Negra, após seu nascimento, Natasha Romanoff (Scarlett Johansson) é dada à KGB, que a prepara para se tornar sua agente definitiva.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_6_header_3months.png'),
            img_header: require('../assets/basic_6_3months.png')
        },
        {
            title:"Free Guy",
            description: "Um caixa de banco preso a uma entediante rotina tem sua vida virada de cabeça para baixo quando ele descobre que é personagem em um brutalmente realista vídeo game de mundo aberto.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_12_header_3months.png'),
            img_header: require('../assets/basic_12_3months.png')
        },
        {
            title:"Top Gun: MAVERICK",
            description: "Em Top Gun: Maverick, depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, o piloto à moda antiga Maverick (Tom Cruise) enfrenta drones e prova que o fator humano ainda é fundamental no mundo contemporâneo das guerras tecnológicas.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_24_header_yearly.png'),
            img_header: require('../assets/basic_24_yearly.png')
        },
        {
            title:"BloodShot",
            description: "Bloodshot é um ex-soldado com poderes especiais: o de regeneração e a capacidade de se metamorfosear. ",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_48_header_yearly.png'),
            img_header: require('../assets/basic_48_yearly.png')
        },
    ]);

    const [background, setBackground] = useState(lista[0].img)

    const [activeIndex, setActiveIndex] = useState(0)

    const _renderItem = ({item, index}) => {

        const img=item.img;
        return (
            <View>
                <TouchableOpacity>
                    <Image
                        source={img}
                        style={styles.carouselImg}
                    />
                </TouchableOpacity>
            </View>
        )
    }


    const submit_voucherV2=async(code)=> {
        toggleOverlay();
        let mail= await AsyncStorage.getItem("email");
        const  URL = "https://core-service.universalvoucher.org/voucher/redeem";

        const data={
            "email":mail,
            "code":code,
            "platform": "loveworld-app"
        }

        axios.post(URL,data)
        .then(function (res) {
            // console.log("Response 536637373377474-",res.data);
            if(res.data.status===1){
                rhapsodyPlusSubscription();

            }else if(res.data.status===0){
                setErrorMessage(res.data.response);
                setVisibleError(true);

            }
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    const rhapsodyPlusSubscription=async()=> {
        let mail= await AsyncStorage.getItem("email");
        if(activeIndex===0){
            setSubscriptionPackage(2.99);

        }else if(activeIndex===1){
            setSubscriptionPackage(4.0);

        }else if(activeIndex===2){
            setSubscriptionPackage(6.0);

        }else if(activeIndex===3){
            setSubscriptionPackage(12.0);

        }else if(activeIndex===4){
            setSubscriptionPackage(24.0);

        }else if(activeIndex===5){
            setSubscriptionPackage(48.0);

        }

        const randomKeyTag = Math.random().toString(36).substring(2, 5);
        try {
        const pk = await generate(randomKeyTag);
        // console.log("pksnsnndnd",pk)
        } catch (e) {
        const {message, userInfo} =  e;
        // console.log("Generation Erriorttt",message);
        }

        const crypto = createCryptoContext(randomKeyTag);

        // Create jwt
        const signedJwt = await new SignJWT(crypto)
        .setPayload({
            sub: 'demoApp',
            iss: 'PagoPa',
        })
        .setProtectedHeader({ typ: 'JWT' })
        .sign();

        const data={
            "email":mail,
            "password":"rabadaba",
            "source":"app",
            "package":subscriptionPackage
        }

        axios.post('https://rowtoken.rhapsodyofrealities.org/api/subscription/add',data, {
        //example with bearer token
        headers: {
            'Authentication': 'Bearer '+signedJwt
        }
        })
        .then(function (res) {
        console.log("rhapsodyPlusSubscription responsesbdbdhfbfb",res.data.response);
        if(res.data.status===1){

            if(subscriptionPackage===2.99){
    
            }else if(subscriptionPackage===4.0){
    
            }else if(subscriptionPackage===6.0){
    
            }else if(subscriptionPackage===12.0){
    
            }else if(subscriptionPackage===24.0){
    
            }else if(subscriptionPackage===48.0){
    
            }


        }else{


        }


        })
        .catch(function (error) {
            console.log(error);
        });

    }
  


  return (
    <ScrollView style={styles.container}>
            <View style={{flex:1, height: screenHeight+400}}>
                <View style={{...StyleSheet.absoluteFill}}>

                        <View style={styles.slideView}>
                            <Carousel
                                style={styles.carousel}
                                ref={carouselRef}
                                data={lista}
                                renderItem={_renderItem}
                                sliderWidth={screenWidth}
                                itemWidth={200}
                                inactiveSlideOpacity={0.5}
                                onSnapToItem={(index) => {
                                    setBackground(lista[index].img)
                                    setActiveIndex(index)
                                }}
                            />
                        </View>
                        
                        <View style={styles.moreInfo}>
                            
                            <View style={{marginTop: 10}}>
                                <View style={{borderTopRightRadius:30,borderTopLeftRadius:30}}>
                                    <Image
                                        style={{width:Dimensions.get('window').width,marginTop:-5,
                                        resizeMode:'contain',height:Dimensions.get('window').width*0.5,
                                        borderTopRightRadius:30,borderTopLeftRadius:30}}
                                        source={lista[activeIndex].img_header}
                                    />
                                </View>
                                <View style={{borderTopRightRadius:20,borderTopLeftRadius:20,
                                    marginLeft:20,marginRight:20,marginBottom:50}}>
                                {/* <Text>{isSubscribed ? 'You are subscribed!' : 'Not subscribed.'}</Text> */}

                                {/* {!isSubscribed && <Button title="Subscribe" onPress={purchaseSubscription} />} */}

                                {(activeIndex===0 || activeIndex===1) &&(
                                    <Text style={{ flexWrap: 'wrap',fontWeight:"bold",marginBottom:5,marginTop:5}}>
                                        Subscribe to this package and get access to 30+ life Changing article</Text>)}

                                {(activeIndex===2 || activeIndex===3) &&(
                                        <Text style={{ flexWrap: 'wrap',fontWeight:"bold",marginBottom:5,marginTop:5}}> 
                                        Subscribe to this package and get access to 150+ life Changing article</Text> )}

                                        {(activeIndex===4 || activeIndex===5) &&(
                                        <Text style={{ flexWrap: 'wrap',fontWeight:"bold",marginBottom:5,marginTop:5}}>
                                        Subscribe to this package and get access to 365+ life Changing article</Text>)}

                                    <Text style={{ flexWrap: 'wrap',fontWeight:"bold"}}>Benefits</Text>

                                    <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Acess to Rhapsody Daily Articles for 1 Month' },
                                                { key: 'Get 1 point instantly!' },
                                                { key: 'Read Rhapsody Daily & get 1 point each day!' },
                                                { key: 'Redeemable Reading points' },
                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{flexWrap:'wrap'}}>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>

                                    <Text style={{ flexWrap: 'wrap',fontWeight:"bold"}}>App features</Text>
                                    {activeIndex===0 &&(
                                    <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Popup Bible' },
                                                { key: 'Change theme' },
                                                { key: 'Save and View your saved articles' },
                                                { key: 'Take and save notes' },
                                                { key: 'Reading Points' },
                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{flexWrap:"wrap"}}>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>)}



                                        {activeIndex===1 &&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Change theme' },
                                                { key: 'Save and View your saved articles' },
                                                { key: 'Take and save notes' },
                                                { key: 'Past Articles' },
                                                { key: 'Bookmark articles' },
                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{flexWrap:"wrap"}}>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>)}

                                        {activeIndex===2 &&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Popup Bible' },
                                                { key: 'Change theme' },
                                                { key: 'Save and View your saved articles' },
                                                { key: 'Take and save notes' },
                                                { key: 'Reading Points' },
                                               
                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{flexWrap:"wrap"}}>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>)}

                                        {activeIndex===3 &&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                
                                                { key: 'Change theme' },
                                                { key: 'Save and View your saved articles' },
                                                { key: 'Take and save notes' },
                                                { key: 'Past articles' },
                                                { key: 'Bookmark articles' },
                                               
                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{flexWrap:"wrap"}}>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>)}


                                        {activeIndex===4 &&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Popup Bible' },
                                                { key: 'Change theme' },
                                                { key: 'Save and View your saved articles' },
                                                { key: 'Take and save notes' },
                                                { key: 'Reading Points' },
                                               
                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{flexWrap:"wrap"}}>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>)}


                                        {activeIndex===5 &&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Change theme' },
                                                { key: 'Save and View your saved articles' },
                                                { key: 'Take and save notes' },
                                                { key: 'Past Articles' },
                                                { key: 'Bookmark articles' },
                                               
                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{flexWrap:"wrap"}}>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>)}

                                        {/* if user is eligible for free trial */}

                                        {isEligibleForFreeTrial &&  (
                                        <View style={{marginTop:10,borderColor:'#26cc00',
                                        borderRadius:8,borderWidth:2,backgroundColor:'#d2f2d4'}}>
                                            <Text style={{alignSelf:'center',fontWeight:'bold',marginTop:5,marginBottom:5}}>
                                                You are Eligible for 7 days free
                                            </Text>
                                            <Text style={{flexWrap:'wrap',marginBottom:5,marginLeft:5,marginRight:5}}>
                                                1. To Begin your free trial, click the button below, provide the valid billing information.
                                             you wont be charged during the trial period.</Text>
                                             <Text style={{flexWrap:'wrap',marginBottom:5,marginLeft:5,marginRight:5}}>
                                                2. Unless canceled before the end of the trial period, your Rhapsody subscription will automatically convert to 
                                                paid subscription to continue your premium experience</Text>
                                             <Text style={{flexWrap:'wrap',marginBottom:5,marginLeft:5,marginRight:5}}>
                                                3. After the free trial, your Rhapsody subscription will automatically renew at $2.99 every MONTH, 
                                                providing uninterrupted access to uour enriching devotionational content.</Text>
                                             <Text style={{flexWrap:'wrap',marginBottom:5,marginLeft:5,marginRight:5}}>
                                                4. Enjoy full acess to all the above App benefits and 
                                                features during your free trial. Immmerse yourself daily</Text>
                                             <Text style={{flexWrap:'wrap',marginBottom:5,marginLeft:5,marginRight:5}}>
                                                5. Easily cancel your free trial anytime  through your Appple store account 
                                                before the trial period concludes to avoid any changes.
                                             </Text>

                                        </View>

                                        )}

                                        {isEligibleForFreeTrial && (
                                            <TouchableOpacity style={{alignItems: 'center',
                                            backgroundColor: '#D8A623',
                                            padding: 10,borderRadius:5,marginTop:30}} onPress={()=>{}}>
                                            <Text>SUBSCRIBE</Text>
                                        </TouchableOpacity>

                                        ) }

                                        <TouchableOpacity style={{alignItems: 'center',
                                            backgroundColor: '#D8A623',
                                            padding: 10,borderRadius:5,marginTop:30}} onPress={()=>{}}>
                                            <Text>SUBSCRIBE</Text>
                                        </TouchableOpacity>
                                        {/* <Text style={{alignSelf:'center',marginBottom:5,marginTop:5}}> or </Text> */}
                                        {/* <TouchableOpacity style={{alignItems: 'center',
                                            backgroundColor: '#12A3B4',
                                            padding: 10,borderRadius:5}} onPress={()=>toggleOverlay()}>
                                            <Text>USE VOUCHER CODE</Text>
                                        </TouchableOpacity> */}

                                        <View style={{height:100}}>

                                        </View>

                                </View>
                                

                            </View>
                        </View>

                        <Overlay ModalComponent={Modal} fullScreen={false}
                            isVisible={visible} 
                            onBackdropPress={toggleOverlay} overlayStyle={{width:windowWidth,height:windowHeight}}>
                                <Image
                                    source={require('../assets/logo.png')}
                                    style={{alignSelf:"center",width:50,height:50,marginTop:-30}}
                                />
                                <Text style={{alignSelf:"center",fontWeight:'bold',fontSize:20,marginTop:10}}>
                                    Fill in Voucher Code
                                </Text>

                                <Input
                                    placeholder='Enter Voucher Here'
                                    leftIcon={
                                        <MaterialCommunityIcons  name='qrcode' size={24} color='black' />
                                    }
                                    onChangeText={newText => setVoucher(newText)}
                                    errorStyle={{ color: 'red' }}
                                    errorMessage='Enter a valid code'
                                    containerStyle={{marginTop:20}}
                                    />

                                <TouchableOpacity style={{alignItems: 'center',
                                            backgroundColor: '#D8A623',
                                            padding: 10,borderRadius:5,marginTop:10}} 
                                            onPress={()=>{
                                                
                                                submit_voucherV2(voucher);}}>
                                            <Text>Submit Code</Text>
                                </TouchableOpacity>
                                <Text style={{alignSelf:'center',color:"#007FFF",marginTop:10}}>
                                     Get a Subscription Voucher Code from
                                </Text>
                                <Text style={{alignSelf:'center',color:"#007FFF"}}>
                                    Vouchers.rhapsodyofrealities.org
                                </Text>
                                
                        </Overlay> 

                        <Overlay ModalComponent={Modal} fullScreen={false}
                            isVisible={visibleError} 
                            onBackdropPress={toggleErrorOverlay} overlayStyle={{width:windowWidth,height:windowHeight*0.6}}>
                                <Image
                                    source={require('../assets/logo.png')}
                                    style={{alignSelf:"center",width:50,height:50,marginTop:-30}}
                                />
                                <View style={{flex:1,
                                            justifyContent:'center',
                                            alignItems:'center'}}>
                                <Text style={{alignSelf:"center",fontWeight:'bold',fontSize:20,marginTop:10}}>
                                    An Error Occurred
                                </Text>

                                <Text style={{alignSelf:"center",marginTop:10}}>
                                    {errorMessage}
                                </Text>

                                <TouchableOpacity style={{alignItems: 'center',
                                            backgroundColor: '#D8A623',
                                            padding: 10,borderRadius:5,marginTop:10}} onPress={()=>toggleErrorOverlay()}>
                                            <Text>Okay</Text>
                                </TouchableOpacity>

                                </View>
                                
                                
                        </Overlay> 
                </View>
            </View>
        </ScrollView>


  );
};



export default ReadingPlans;