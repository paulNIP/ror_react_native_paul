import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    FlatList,
    Button, Pressable, Modal, Platform,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import styles from '../screens/styles';
import { giveSubscription, purchaseSubscription, saveSubscription } from "../service/subscriptionService";
import CustomAlert from "./CustomAlert";
import * as RNIap from "react-native-iap";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FamilyPlans = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const carouselRef = useRef(null);

    const subscribe = async (plan) => {
        try {
            const subscriptionSkus = Platform.select({
                ios: [plan]
            });
            await RNIap.initConnection();
            const products = await RNIap.getProducts({ skus: subscriptionSkus });
            if (products && products.length > 0) {
                const productID = products[0];
                let packagePrice;
                if (productID.productId === "monthlyPlanNew2") {
                    packagePrice = 2.99;
                } else if (productID.productId === "ThreeMonthPlan") {
                    packagePrice = 4;
                } else if (productID.productId === "yearlyPlanNewNew") {
                    packagePrice = 24;
                } else if (productID.productId === "familyPlan") {
                    packagePrice = 9.99;
                } else {
                    packagePrice = 0;
                }
                const purchase = await RNIap.requestPurchase({ sku: productID.productId });
                if (purchase) {
                    const data = await saveSubscription(productID, purchase);
                    if (data.status === 1) {
                        const email = await AsyncStorage.getItem('email');
                        const points = await giveSubscription(email, packagePrice);
                        if (points.status === 1) {
                            setAlertTitle("Congratulations ... ");
                            setAlertMessage("Your subscription is successful. " + points.response);
                            setModalVisible(true);
                        }
                    } else {
                        setAlertTitle("Error");
                        setAlertMessage("Something went wrong with your subscription. Please try again");
                        setModalVisible(true);
                    }
                }
            }
        } catch (error) {
            console.warn('Error purchasing subscription:', error);
        }
    };

    const [FamilyPlansList, setFamilyPlansList] = useState([
        {
            img: require('../assets/family_9_header.png'),
            img_header: require('../assets/family_9.png'),
        },
        {
            img: require('../assets/family_28_header.png'),
            img_header: require('../assets/family_28.png'),
        },
        {
            img: require('../assets/family_109_header.png'),
            img_header: require('../assets/family_109.png'),
        },
    ]);

    const [background, setBackground] = useState(FamilyPlansList[0].img);
    const [activeIndex, setActiveIndex] = useState(0);

    const _renderItem = ({ item, index }) => {
        const img = item.img;
        return (
            <View>
                <TouchableOpacity>
                    <Image source={img} style={styles.carouselImg} />
                </TouchableOpacity>
            </View>
        );
    };

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
                        fontWeight: '500'
                    },
                    message: {
                        color: '#52565e',
                        fontFamily: 'Roboto',
                        fontSize: 16,
                        fontWeight: 'regular',
                    },
                }}
                buttons={[{ text: 'OK' }]}
            />
            <View style={{ flex: 1, height: screenHeight + 100 }}>
                <View style={{ ...StyleSheet.absoluteFill }}>
                    <View style={styles.slideView}>
                        <Carousel
                            style={styles.carousel}
                            ref={carouselRef}
                            data={FamilyPlansList}
                            renderItem={_renderItem}
                            sliderWidth={screenWidth}
                            itemWidth={160}
                            inactiveSlideOpacity={0.2}
                            onSnapToItem={(index) => {
                                setBackground(FamilyPlansList[index].img);
                                setActiveIndex(index);
                            }}
                        />
                    </View>

                    <View style={styles.moreInfo}>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
                                <Image
                                    style={{
                                        width: Dimensions.get('window').width,
                                        marginTop: -5,
                                        resizeMode: 'contain',
                                        height: Dimensions.get('window').width * 0.48,
                                        borderTopRightRadius: 30,
                                        borderTopLeftRadius: 30,
                                    }}
                                    source={FamilyPlansList[activeIndex].img_header}
                                />
                            </View>
                            <View
                                style={{
                                    borderTopRightRadius: 20,
                                    borderTopLeftRadius: 20,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginBottom: 50,
                                }}
                            >
                                <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', marginBottom: 5, marginTop: 5, paddingLeft: 10 }}>
                                    Subscribe to this package and get access to :
                                </Text>
                                <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', paddingLeft: 10 }}>Benefits</Text>
                                {activeIndex === 0 && (
                                    <View style={{ padding: 10, paddingLeft: 30 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Access to adult, teens, and kids Rhapsody on the store' },
                                                { key: 'Get 1 point ' },
                                                { key: '1 month premium access for up to 6 devices' },
                                            ]}
                                            renderItem={({ item }) => (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{ flexWrap: 'wrap' }}>{`• ${item.key}`}</Text>
                                                </View>
                                            )}
                                        />
                                        <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', paddingLeft: 30 }}>App features</Text>
                                        <View style={{ padding: 10, paddingLeft: 0 }}>
                                            <FlatList
                                                data={[
                                                    { key: 'Popup Bible' },
                                                    { key: 'Change theme' },
                                                    { key: 'Save and View your saved articles' },
                                                    { key: 'Take and save notes' },
                                                    { key: 'Redeemable Reading Points' },
                                                ]}
                                                renderItem={({ item }) => (
                                                    <View style={{ marginBottom: 5 }}>
                                                        <Text style={{ flexWrap: 'wrap' }}>{`• ${item.key}`}</Text>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                        <TouchableOpacity style={btnstyles.subscribeButton} onPress={() => {
                                            subscribe('familyPlan')
                                        }}><Text>SUBSCRIBE $9.99 </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {activeIndex === 1 && (
                                    <View style={{ padding: 10, paddingLeft: 30 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Access to adult,teens and kids Rhapsody on the store' },
                                                { key: 'Get 3 points ' },
                                                { key: '3 month premium access for up to 6 devices' },
                                            ]}
                                            renderItem={({ item }) => (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{ flexWrap: 'wrap' }}>{`• ${item.key}`}</Text>
                                                </View>
                                            )}
                                        />
                                        <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', paddingLeft: 30 }}>App features</Text>
                                        <View style={{ padding: 10, paddingLeft: 0 }}>
                                            <FlatList
                                                data={[
                                                    { key: 'Popup Bible' },
                                                    { key: 'Change theme' },
                                                    { key: 'Save and View your saved articles' },
                                                    { key: 'Take and save notes' },
                                                    { key: 'Redeemable Reading Points' },
                                                ]}
                                                renderItem={({ item }) => (
                                                    <View style={{ marginBottom: 5 }}>
                                                        <Text style={{ flexWrap: 'wrap' }}>{`• ${item.key}`}</Text>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    </View>
                                )}
                                {activeIndex === 2 && (
                                    <View style={{ padding: 10, paddingLeft: 30 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Access to adult,teens and kids Rhapsody on the store' },
                                                { key: 'Get 12 points ' },
                                                { key: '1 year premium access for up to 6 devices' },
                                            ]}
                                            renderItem={({ item }) => (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{ flexWrap: 'wrap' }}>{`• ${item.key}`}</Text>
                                                </View>
                                            )}
                                        />
                                        <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', paddingLeft: 30 }}>App features</Text>
                                        <View style={{ padding: 10, paddingLeft: 0 }}>
                                            <FlatList
                                                data={[
                                                    { key: 'Popup Bible' },
                                                    { key: 'Change theme' },
                                                    { key: 'Save and View your saved articles' },
                                                    { key: 'Take and save notes' },
                                                    { key: 'Redeemable Reading Points' },
                                                ]}
                                                renderItem={({ item }) => (
                                                    <View style={{ marginBottom: 5 }}>
                                                        <Text style={{ flexWrap: 'wrap' }}>{`• ${item.key}`}</Text>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    </View>
                                )}
                                <View style={{ height: 100 }}></View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const btnstyles = StyleSheet.create({
    subscribeButton: {
        alignItems: 'center',
        backgroundColor: '#D8A623',
        padding: 15,
        borderRadius: 20,
        marginTop: 30,
    }
});

export default FamilyPlans;