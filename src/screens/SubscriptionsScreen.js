import React, { useState,useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,Dimensions,Image,FlatList
} from "react-native";
import Carousel from 'react-native-snap-carousel';

import AsyncStorage from "@react-native-async-storage/async-storage";

// importing Segmented Control Tab
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GiftPlans from "../components/GiftPlans";
import FamilyPlans from "../components/FamilyPlans";
import ReadingPlans from "../components/ReadingPlans";


import {
  PurchaseError,
  requestSubscription,
  useIAP,
  validateReceiptIos,
} from "react-native-iap";
import Strings from "../constants/Strings";

const errorLog = ({ message, error }) => {
  console.error("An error happened", message, error);
};

const isIos = Platform.OS === "ios";
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');


//product id from appstoreconnect app->subscriptions
const subscriptionSkus = Platform.select({
  ios: ["7SpiritsOfGodNew"],
});

const SubscriptionsScreen = ({ navigation }) => {

  //useIAP - easy way to access react-native-iap methods to
  //get your products, purchases, subscriptions, callback
  //and error handlers.
  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
  } = useIAP();

  const carouselRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isEligibleForFreeTrial, setIsEligibleForFreeTrial] = useState(false);

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


  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory();
    } catch (error) {
      errorLog({ message: "handleGetPurchaseHistory", error });
    }
  };

  useEffect(() => {
    handleGetPurchaseHistory();
  }, [connected]);

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({ skus: subscriptionSkus });
    } catch (error) {
      errorLog({ message: "handleGetSubscriptions", error });
    }
  };

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


  useEffect(() => {
    handleGetSubscriptions();
  }, [connected]);

  useEffect(() => {
    // ... listen if connected, purchaseHistory and subscriptions exist
    if (
      purchaseHistory.find(
        (x) => x.productId === (subscriptionSkus[0] || subscriptionSkus[1]),
      )
    ) {
      navigation.navigate("Home");
    }
  }, [connected, purchaseHistory, subscriptions]);

  const handleBuySubscription = async (productId) => {
    try {
      await requestSubscription({
        sku: productId,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof PurchaseError) {
        errorLog({ message: `[${error.code}]: ${error.message}`, error });
      } else {
        errorLog({ message: "handleBuySubscription", error });
      }
    }
  };

  useEffect(() => {
    const checkCurrentPurchase = async (purchase) => {
      if (purchase) {
        try {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            if (Platform.OS === "ios") {
              const isTestEnvironment = __DEV__;

              //send receipt body to apple server to validete
              const appleReceiptResponse = await validateReceiptIos(
                {
                  "receipt-data": receipt,
                  password: Strings.APP_SHARED_SECRET,
                },
                isTestEnvironment,
              );

              //if receipt is valid
              if (appleReceiptResponse) {
                const { status } = appleReceiptResponse;
                if (status) {
                  navigation.navigate("Home");
                }
              }

              return;
            }
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);


  //segmented control
  // For single select SegmentedControlTab
  const [selectedIndex, setSelectedIndex] = useState(0);
  // For multi select SegmentedControlTab
  const [selectedIndices, setSelectedIndices] = useState([0]);
  // For custom SegmentedControlTab
  const [customStyleIndex, setCustomStyleIndex] = useState(0);

  const handleSingleIndexSelect = (index) => {
    // For single Tab Selection SegmentedControlTab
    setSelectedIndex(index);
  };



  const handleCustomIndexSelect = (index) => {
    // Tab selection for custom Tab Selection
    setCustomStyleIndex(index);
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.container}>
        {/* Simple Segmented Control*/}
        <Text
            style={
              (styles.listItem,
              {
                fontWeight: "500",
                textAlign: "center",
                marginTop: 10,
                fontSize: 18,
                marginBottom:5
              })
            }
          >
            Subscription Packages
          </Text>
        <SegmentedControlTab
          values={['READING PLANS', 'FAMILY PLANS','GIFT PLANS']}
          selectedIndex={customStyleIndex}
          tabStyle={{borderColor: '#D8A623'}}
          activeTabStyle={{borderColor: '#D8A623',backgroundColor:'#D8A623'}}
          tabsContainerStyle={{backgroundColor: '#D8A623' }}
          onTabPress={handleCustomIndexSelect}
        />

        {customStyleIndex === 0 && (
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
                                         padding: 10,borderRadius:5,marginTop:30}} onPress={()=>{
                                          setLoading(true);
                                          handleBuySubscription("7SpiritsOfGodNew");
                                         }}>
                                         <Text>SUBSCRIBE</Text>
                                     </TouchableOpacity>

                                     <View style={{height:100}}>

                                     </View>

                             </View>
                             

                         </View>
                    </View>
             </View>
         </View>
        )}
        {customStyleIndex === 1 && (
              <FamilyPlans/>
        )}
        {customStyleIndex === 2 && (
             <GiftPlans/>
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}


export default SubscriptionsScreen;






const styles = StyleSheet.create({
  listItem: {
    fontSize: 16,
    paddingLeft: 8,
    paddingBottom: 3,
    textAlign: "center",
    color: "black",
  },
  box: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowOffset: { height: 16, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "mediumseagreen",
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  specialTag: {
    color: "white",
    backgroundColor: "crimson",
    width: 125,
    padding: 4,
    fontWeight: "bold",
    fontSize: 12,
    borderRadius: 7,
    marginBottom: 2,
  },

  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    padding: 8,
    fontSize: 14,
    color: '#444444',
    textAlign: 'center',
  },
  tabContent: {
    color: '#444444',
    fontSize: 18,
    margin: 24,
  },
  seperator: {
    marginHorizontal: -10,
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderTopColor: '#888888',
    marginTop: 24,
  },

  subcontainer:{
    flex: 1,
},
imgBg:{
    flex: 1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#000'
},
viewSearch:{
    marginTop: 15,
    backgroundColor: "#FFF",
    elevation: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center'
},
input:{
    width: '90%',
    padding: 13,
    paddingLeft: 20,
    fontSize: 17,
},
icon:{
    position: 'absolute',
    right: 20,
    top: 15
},
slideView:{
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop:15
},
carousel:{
    flex: 1,
    overflow: 'visible'
},
carouselImg:{
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 10,
},
carouselIcon:{
    position: 'absolute',
    top: 15,
    right: 15
},
moreInfo:{
    backgroundColor:'#F6F6F6',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: "row",
    justifyContent: 'space-around',
    marginTop:-110
},
movieTitle:{
    paddingLeft: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#131313',
    marginBottom: 5,
    marginTop:10
},
movieDesc:{
    paddingLeft: 15,
    fontSize: 14,
    color: '#131313',
}

});


