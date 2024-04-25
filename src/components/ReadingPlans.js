import React, { useState,useEffect, useRef } from 'react';
import {
    View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions,
    TextInput, TouchableOpacity, Alert, Modal, Image, FlatList, Button, Platform, Pressable
} from 'react-native';

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

    const [modalVisible, setModalVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

   useEffect(() => {
    //checkSubscriptionStatus();
  }, []);



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


  /**
   * Purchase a subscription plan.
   * @async
   * @param {string} plan - The subscription plan to purchase.
   * @returns {void}
   * @throws {Error} if there is an error purchasing the subscription.
   */
  const purchaseSubscription = async (plan) => {
    try {
        const subscriptionSkus = Platform.select({
            ios: [plan]
        });
        await RNIap.initConnection();
        const products = await RNIap.getProducts({ skus: subscriptionSkus });
        console.log("product is ", products)
        if (products && products.length > 0) {
            const productID = products[0]
            const purchase= await RNIap.requestPurchase({ sku: productID.productId});
            if(purchase) {
                await saveSubscription(productID, purchase)
            }
        }
    } catch (error) {
      console.warn('Error purchasing subscription:', error);
    }
  };

  /**
   * Saves the subscription for a given product and purchase.
   * @param {object} productID - The product ID object.
   * @param {object} purchase - The purchase object.
   */
  const saveSubscription = async(productID, purchase)=>{

      let packagePrice
      if(productID.productId === "monthlyPlanNew2"){
          packagePrice = 2.99
      }else if(productID.productId === "ThreeMonthPlan"){
          packagePrice = 4
      }else if(productID.productId === "yearlyPlanNewNew"){
          packagePrice = 24
      }
      else{
          packagePrice = 0
      }

      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('name');
      const country = await AsyncStorage.getItem('country')

      let data = {
          "email": email,
          "fullnames": name,
          "country": country,
          "currency": productID.currency,
          "amount": productID.price,
          "transaction_id": purchase.transactionId,
          "reference_id": "ios-" + purchase.transactionId,
          "status": "success",
          "usd_package": packagePrice,
          "source": "ios",
          "payment_method": "applepay",
          "password": "rabadaba"
      };

      const response = await axios.post('https://rhapsodysubscriptions.org/api/subscription/init', data);
      console.log(response.data)
      if(response.data && response.data.status === 1) {
          await giveSubscription(email, packagePrice)
          console.log('Subscription saved');
      } else {
          console.log('Failed to save data');
      }
  }

/**
 * Sends a subscription request to row token (the wallet)
 * @param {string} email - The email address of the subscriber.
 * @param {number} packagePrice - The subscription package.
 */
const giveSubscription = async(email, packagePrice)=>{
    let data = {
        "email": email,
        "package": packagePrice,
        "password": "rabadaba"
    };
    const response = await axios.post('https://rowtoken.rhapsodyofrealities.org/api/subscription/add', data);
    console.log(response.data)
    if(response.data && response.data.status === 1) {
        setAlertTitle("Success")
        setAlertMessage("Your Subscription is successful.")
        setModalVisible(true)
        console.log('Subscription complete');
    } else {
        console.log('Failed to subscribe');
    }
}

    const CustomAlert = (props) => {
        const [iOSDefaults] = useState({
            container: {
                backgroundColor: (props.ios && props.ios.container && props.ios.container.backgroundColor) || '#F8F8F8',
            },
            title: {
                color: (props.ios && props.ios.title && props.ios.title.color) || '#000000',
                fontFamily: (props.ios && props.ios.title && props.ios.title.fontFamily) || 'initial',
                fontSize: (props.ios && props.ios.title && props.ios.title.fontSize) || 17,
                fontWeight: (props.ios && props.ios.title && props.ios.title.fontWeight) || '600',
            },
            message: {
                color: (props.ios && props.ios.message && props.ios.message.color) || '#000000',
                fontFamily: (props.ios && props.ios.message && props.ios.message.fontFamily) || 'initial',
                fontSize: (props.ios && props.ios.message && props.ios.message.fontSize) || 13,
                fontWeight: (props.ios && props.ios.message && props.ios.message.fontWeight) || 'normal',
            },
            button: {
                color: '#387ef5',
                fontFamily: 'initial',
                fontSize: 17,
                fontWeight: '500',
                textTransform: 'none',
                backgroundColor: 'transparent',
            },
        });

        const IOSButtonBox = () => {
            const buttonProps = props.buttons && props.buttons.length > 0 ? props.buttons : [{}]
            const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(buttonProps.length === 2 ? 1 : 0);
            return (
                <View style={[modalStyles.iOSButtonGroup, {
                    flexDirection: buttonLayoutHorizontal === 1 ? "row" : "column",
                }]} onLayout={(e) => {
                    if (e.nativeEvent.layout.height > 60)
                        setButtonLayoutHorizontal(0);
                }}>
                    {
                        buttonProps.map((item, index) => {
                            let defaultButtonText = 'OK'
                            if (buttonProps.length > 2) {
                                if (index === 0)
                                    defaultButtonText = 'ASK ME LATER'
                                else if (index === 1)
                                    defaultButtonText = 'CANCEL';
                            } else if (buttonProps.length === 2 && index === 0)
                                defaultButtonText = 'CANCEL';
                            const singleButtonWrapperStyle = {}
                            let singleButtonWeight = iOSDefaults.button.fontWeight;
                            if (index === buttonProps.length - 1) {
                                singleButtonWeight = '700';
                            }
                            if (buttonLayoutHorizontal === 1) {
                                singleButtonWrapperStyle.minWidth = '50%';
                                if (index === 0) {
                                    singleButtonWrapperStyle.borderStyle = 'solid';
                                    singleButtonWrapperStyle.borderRightWidth = 0.55;
                                    singleButtonWrapperStyle.borderRightColor = '#dbdbdf';
                                }

                            }
                            return (
                                <View style={[modalStyles.iOSButton, singleButtonWrapperStyle]}>
                                    <Pressable onPress={() => {
                                        props.setModalVisible(false)
                                        if (item.func && typeof (item.func) === 'function')
                                            item.func();
                                    }}>
                                        <View
                                            style={[modalStyles.iOSButtonInner, {backgroundColor: (item.modalStyles && item.modalStyles.backgroundColor) || iOSDefaults.button.backgroundColor}]}>
                                            <Text
                                                style={{
                                                    color: (item.modalStyles && item.modalStyles.color) || iOSDefaults.button.color,
                                                    fontFamily: (item.modalStyles && item.modalStyles.fontFamily) || iOSDefaults.button.fontFamily,
                                                    fontSize: (item.modalStyles && item.modalStyles.fontSize) || iOSDefaults.button.fontSize,
                                                    fontWeight: (item.modalStyles && item.modalStyles.fontWeight) || singleButtonWeight,
                                                    textTransform: (item.modalStyles && item.modalStyles.textTransform) || iOSDefaults.button.textTransform,
                                                    textAlign: 'center'
                                                }}
                                            >{item.text || defaultButtonText}</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            )
                        })

                    }
                </View>
            );
        }
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    props.setModalVisible(false);
                }}>
                <Pressable
                    style={[ modalStyles.iOSBackdrop , modalStyles.backdrop ]}
                    onPress={() => props.setModalVisible(false)}/>
                <View style={modalStyles.alertBox}>
                    {
                        <View style={[modalStyles.iOSAlertBox, iOSDefaults.container]}>
                            <Text style={[modalStyles.iOSTitle, iOSDefaults.title]}>{props.title || 'Message'}</Text>
                            <Text style={[modalStyles.iOSMessage, iOSDefaults.message]}>{props.message || ''}</Text>
                            <IOSButtonBox/>
                        </View>
                    }
                </View>
            </Modal>
        )
    }

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

                    <CustomAlert
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        title={alertTitle}
                        message={alertMessage}
                        ios={{
                            container: {
                                backgroundColor: 'white'
                            },
                            title: {
                                color: '#52565e',
                                fontSize: 26,
                                fontWeight : '500'
                            },
                            message: {
                                color: '#52565e',
                                fontFamily: 'Roboto',
                                fontSize: 16,
                                fontWeight: 'regular',
                            },
                        }}
                        buttons={[{
                            text: 'OK'
                        }]}
                    />

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
                                                { key: 'Basic Features for 1 Month' },
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
                                            <TouchableOpacity style={{alignItems: 'center',
                                                backgroundColor: '#D8A623',
                                                padding: 10,borderRadius:5,marginTop:30}} onPress={()=>{
                                                purchaseSubscription('monthlyPlanNew2')
                                            }}><Text>SUBSCRIBE $2 </Text>
                                            </TouchableOpacity>
                                        </View>)}



                                        {activeIndex===1 &&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Premium Features for 1 Month' },
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
                                            <TouchableOpacity style={{alignItems: 'center',
                                                backgroundColor: '#D8A623',
                                                padding: 10,borderRadius:5,marginTop:30}} onPress={()=>{
                                                purchaseSubscription('ThreeMonthPlan')
                                            }}><Text>SUBSCRIBE $4 </Text>
                                            </TouchableOpacity>
                                        </View>)}

                                        {activeIndex===2 &&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Basic Features for 3 Months' },
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
                                        </View>

                                        )}

                                        {activeIndex===3 &&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Premium Features for 3 Months' },
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
                                                { key: 'Basic App Features for 1 Year' },
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
                                            <TouchableOpacity style={{alignItems: 'center',
                                                backgroundColor: '#D8A623',
                                                padding: 10,borderRadius:5,marginTop:30}} onPress={()=>{
                                                purchaseSubscription('yearlyPlanNewNew')
                                            }}><Text>SUBSCRIBE $24 </Text>
                                            </TouchableOpacity>
                                        </View>)}


                                        {activeIndex===5 &&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Premium App Features for 1 Year' },
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

                                        {/*<TouchableOpacity style={{alignItems: 'center',*/}
                                        {/*    backgroundColor: '#D8A623',*/}
                                        {/*    padding: 10,borderRadius:5,marginTop:30}} onPress={()=>{*/}
                                        {/*    purchaseSubscription()*/}
                                        {/*}}>*/}
                                        {/*    <Text>SUBSCRIBE</Text>*/}
                                        {/*</TouchableOpacity>*/}


                                        <View style={{height:100}}>

                                        </View>

                                </View>
                                

                            </View>
                        </View>



                </View>
            </View>
            {loading && <ActivityIndicator size="large" />}
        </ScrollView>


  );
};


const modalStyles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.32
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    alertBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iOSAlertBox: {
        maxWidth: 270,
        width: '100%',
        zIndex: 10,
        borderRadius: 13,
    },
    iOSTitle: {
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 7,
        paddingLeft: 16,
        marginTop: 8,
        textAlign: "center",
    },
    iOSMessage: {
        paddingTop: 0,
        paddingRight: 16,
        paddingBottom: 21,
        paddingLeft: 16,
        textAlign: "center"
    },
    iOSButtonGroup: {
        marginRight: -0.55
    },
    iOSButton: {

        borderTopColor: '#dbdbdf',
        borderTopWidth: 0.55,
        borderStyle: 'solid',
    },
    iOSButtonInner: {
        minHeight: 44,
        justifyContent: 'center'
    }

});


export default ReadingPlans;