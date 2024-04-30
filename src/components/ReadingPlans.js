import React, { useState,useEffect, useRef } from 'react';
import {
    View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions,
    TextInput, TouchableOpacity, Alert, Modal, Image, FlatList, Button, Platform, Pressable
} from 'react-native';

import Carousel from 'react-native-snap-carousel';


const {width: screenWidth, height: screenHeight} = Dimensions.get('window');


import styles from '../screens/styles'
import {giveSubscription, purchaseSubscription, saveSubscription} from "../service/subscriptionService";
import CustomAlert from "./CustomAlert";
import * as RNIap from "react-native-iap";
import {getFaithProsperity} from "../service/storeService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHeight = Dimensions.get('window').height*0.4;
const windowWidth = Dimensions.get('window').width*0.8;


const ReadingPlans = () => {

   const carouselRef = useRef(null)
   const [visible, setVisible] = useState(false);
   const [visibleError, setVisibleError] = useState(false);
   const [errorMessage,setErrorMessage] = useState();

    const [modalVisible, setModalVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const [subscribed, setSubscribed] = useState(false);

   useEffect(() => {
    //checkSubscriptionStatus();
  }, []);

    const subscribe = async (plan) => {

        try {
            const subscriptionSkus = Platform.select({
                ios: [plan]
            });
            await RNIap.initConnection();
            const products = await RNIap.getProducts({ skus: subscriptionSkus });
            //console.log("product is ", products)
            if (products && products.length > 0) {
                const productID = products[0]

                let packagePrice
                if(productID.productId === "monthlyPlanNew2"){
                    packagePrice = 2.99
                } else if(productID.productId === "ThreeMonthPlan"){
                    packagePrice = 4
                } else if(productID.productId === "yearlyPlanNewNew"){
                    packagePrice = 24
                } else if(productID.productId === "familyPlan"){
                    packagePrice = 9.99
                } else{
                    packagePrice = 0
                }

                const purchase= await RNIap.requestPurchase({ sku: productID.productId});
                if(purchase) {
                    const data = await saveSubscription(productID, purchase)

                    if( data.status === 1){
                        const email =  await AsyncStorage.getItem('email');
                        const points = await giveSubscription(email, packagePrice)
                        if( points.status === 1){
                            setAlertTitle("Congratulations ... ")
                            setAlertMessage("Your subscription is successful. " + points.response )
                            setModalVisible(true)
                        }
                    }else{
                        setAlertTitle("Error")
                        setAlertMessage("Something went wrong with your subscription. Please try again")
                        setModalVisible(true)
                    }
                }else{

                }

            }
        } catch (error) {
            console.warn('Error purchasing subscription:', error);
        }
    }



    const [ReadingPlansList, setReadingPlansList] = useState([
        {
            img: require('../assets/basic_2_99.png'),
            img_header: require('../assets/basic_2_header_99.png')
        },
        {
            img: require('../assets/basic_4_header.png'),
            img_header: require('../assets/basic_4.png')
        },
        {
            img: require('../assets/basic_6_header_3months.png'),
            img_header: require('../assets/basic_6_3months.png')
        },
        {
            img: require('../assets/basic_12_header_3months.png'),
            img_header: require('../assets/basic_12_3months.png')
        },
        {
            img: require('../assets/basic_24_header_yearly.png'),
            img_header: require('../assets/basic_24_yearly.png')
        },
        {
            img: require('../assets/basic_48_header_yearly.png'),
            img_header: require('../assets/basic_48_yearly.png')
        },
    ]);

    const [background, setBackground] = useState(ReadingPlansList[0].img)

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



  return (
    <ScrollView style={styles.container}>

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

            <View style={{flex:1, height: screenHeight+400}}>
                <View style={{...StyleSheet.absoluteFill}}>

                        <View style={styles.slideView}>
                            <Carousel
                                style={styles.carousel}
                                ref={carouselRef}
                                data={ReadingPlansList}
                                renderItem={_renderItem}
                                sliderWidth={screenWidth}
                                itemWidth={160}
                                inactiveSlideOpacity={0.2}
                                onSnapToItem={(index) => {
                                    setBackground(ReadingPlansList[index].img)
                                    setActiveIndex(index)
                                }}
                            />
                        </View>
                        
                        <View style={styles.moreInfo}>
                            
                            <View style={{marginTop: 10}}>
                                <View style={{borderTopRightRadius:30,borderTopLeftRadius:30}}>
                                    <Image
                                        style={{width:Dimensions.get('window').width,marginTop:-5,
                                        resizeMode:'contain',height:Dimensions.get('window').width*0.48,
                                        borderTopRightRadius:20,borderTopLeftRadius:20}}
                                        source={ReadingPlansList[activeIndex].img_header}
                                    />
                                </View>
                                <View style={{borderTopRightRadius:20,borderTopLeftRadius:20,
                                    marginLeft:20,marginRight:20,marginBottom:50, paddingLeft:10}}>

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

                                    <View style={{ padding: 10, paddingLeft:30 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Get 1 point instantly!' },
                                                { key: 'Read Rhapsody Daily & get 1 point each day!' },
                                                { key: 'Redeemable Reading points' },
                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{flexWrap:'wrap'}}>{`• ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>

                                    <Text style={{ flexWrap: 'wrap',fontWeight:"bold"}}>App features</Text>
                                    {activeIndex===0 &&(
                                    <View style={{ padding: 10, paddingLeft:30 }}>
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
                                                    <Text style={{flexWrap:"wrap"}}>{`• ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                            <TouchableOpacity style={btnstyles.subscribeButton} onPress={()=>{
                                                subscribe('monthlyPlanNew2')
                                            }}><Text>SUBSCRIBE $2 </Text>
                                            </TouchableOpacity>
                                        </View>)}



                                        {activeIndex===1 &&(
                                        <View style={{ padding: 10, paddingLeft:30 }}>
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
                                                    <Text style={{flexWrap:"wrap"}}>{`• ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                            <TouchableOpacity style={btnstyles.subscribeButton} onPress={()=>{
                                                subscribe('ThreeMonthPlan')
                                            }}><Text>SUBSCRIBE $4 </Text>
                                            </TouchableOpacity>
                                        </View>)}

                                        {activeIndex===2 &&(
                                        <View style={{ padding: 10, paddingLeft:30 }}>
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
                                                    <Text style={{flexWrap:"wrap"}}>{`• ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>

                                        )}

                                        {activeIndex===3 &&(
                                        <View style={{ padding: 10, paddingLeft:30 }}>
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
                                                    <Text style={{flexWrap:"wrap"}}>{`• ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>)}


                                        {activeIndex===4 &&(
                                        <View style={{ padding: 10, paddingLeft:30 }}>
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
                                                    <Text style={{flexWrap:"wrap"}}>{`• ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                            <TouchableOpacity style={ btnstyles.subscribeButton } onPress={()=>{
                                                subscribe('yearlyPlanNewNew')
                                            }}><Text>SUBSCRIBE $24 </Text>
                                            </TouchableOpacity>
                                        </View>)}


                                        {activeIndex===5 &&(
                                        <View style={{ padding: 10, paddingLeft:30 }}>
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
                                                    <Text style={{flexWrap:"wrap"}}>{`• ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>)}


                                        <View style={{height:100}}>

                                        </View>

                                </View>
                            </View>
                        </View>


                </View>
            </View>
        </ScrollView>
  );
};


const btnstyles = StyleSheet.create({
    subscribeButton :{
        alignItems: 'center',
        backgroundColor: '#D8A623',
        padding: 15,
        borderRadius:20,
        marginTop:30,

    }
})


export default ReadingPlans;