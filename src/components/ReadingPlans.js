import React, { useState,useEffect, useRef } from 'react';
import {
    View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions,
    TextInput, TouchableOpacity, Alert, Modal, Image, FlatList, Button, Platform, Pressable
} from 'react-native';

import Carousel from 'react-native-snap-carousel';


const {width: screenWidth, height: screenHeight} = Dimensions.get('window');


import styles from '../screens/styles'
import {purchaseSubscription} from "../service/subscriptionService";


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
        purchaseSubscription(plan)
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
                                    marginLeft:20,marginRight:20,marginBottom:50}}>

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
                                                subscribe('monthlyPlanNew2')
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
                                                subscribe('ThreeMonthPlan')
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
                                                subscribe('yearlyPlanNewNew')
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