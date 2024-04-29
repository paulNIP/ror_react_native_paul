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
  Button,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import styles from '../screens/styles';
import {purchaseSubscription} from "../service/subscriptionService";

const FamilyPlans = () => {
  const carouselRef = useRef(null);

    const subscribe = async (plan) => {
        purchaseSubscription(plan)
    }

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
                <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', marginBottom: 5, marginTop: 5 }}>
                  Subscribe to this package and get access to 30+ life Changing articles for 1 Month
                </Text>
                <Text style={{ flexWrap: 'wrap', fontWeight: 'bold' }}>Benefits</Text>
                {activeIndex === 0 && (
                  <View style={{ padding: 10, paddingLeft:30 }}>
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
                      <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', paddingLeft:30 }}>App features</Text>
                      <View style={{ padding: 10, paddingLeft:0 }}>
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
                      <TouchableOpacity style={{alignItems: 'center',
                          backgroundColor: '#D8A623',
                          padding: 10,borderRadius:5,marginTop:30}} onPress={()=>{
                          subscribe('familyPlan')
                      }}><Text>SUBSCRIBE $9.99 </Text>
                      </TouchableOpacity>
                  </View>

                )}

                {activeIndex === 1 && (
                  <View style={{ padding: 10 , paddingLeft:30 }}>
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
                      <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', paddingLeft:30 }}>App features</Text>
                      <View style={{ padding: 10, paddingLeft:0 }}>
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
                  <View style={{ padding: 10, paddingLeft:30 }}>
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
                      <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', paddingLeft:30 }}>App features</Text>
                      <View style={{ padding: 10, paddingLeft:0 }}>
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

export default FamilyPlans;