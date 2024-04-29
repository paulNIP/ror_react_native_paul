import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Image,
  FlatList
} from "react-native";
import Carousel from 'react-native-snap-carousel';

import AsyncStorage from "@react-native-async-storage/async-storage";

import SegmentedControlTab from 'react-native-segmented-control-tab';

import FamilyPlans from "../components/FamilyPlans";
import ReadingPlans from "../components/ReadingPlans";


const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const SubscriptionsScreen = ({ navigation }) => {
  const carouselRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [customStyleIndex, setCustomStyleIndex] = useState(0);

  const handleCustomIndexSelect = (index) => {
    setCustomStyleIndex(index);
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container }>
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
            values={['READING PLANS', 'FAMILY PLANS' ]}
            selectedIndex={customStyleIndex}
            tabStyle={{borderColor: '#D8A623'}}
            activeTabStyle={{borderColor: '#D8A623',backgroundColor:'#D8A623'}}
            tabsContainerStyle={{backgroundColor: '#D8A623' }}
            onTabPress={handleCustomIndexSelect}
          />

          {customStyleIndex === 0 && <ReadingPlans />}
          {customStyleIndex === 1 && <FamilyPlans />}
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
    backgroundColor: '#FFF',
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
});