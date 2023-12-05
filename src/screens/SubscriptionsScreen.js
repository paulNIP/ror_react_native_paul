import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import {
  PurchaseError,
  requestSubscription,
  useIAP,
  validateReceiptIos,
} from "react-native-iap";


// importing Segmented Control Tab
import SegmentedControlTab from 'react-native-segmented-control-tab';


const errorLog = ({ message, error }) => {
  console.error("An error happened", message, error);
};

const isIos = Platform.OS === "ios";

//product id from appstoreconnect app->subscriptions
const subscriptionSkus = Platform.select({
  ios: ["cwgmonthly299"],
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

  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState();

  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory();
    } catch (error) {
      errorLog({ message: "handleGetPurchaseHistory", error });
    }
  };

  //fetch theme
  const fetchTheme = async () => {
    const color= await AsyncStorage.getItem('THEME_COLOR');
    if(data==null){
      setTheme('#D8A623');
    }else{
      setTheme(color);
    }
    
 }

  useEffect(() => {
    handleGetPurchaseHistory();
    fetchTheme();
  }, [connected]);

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({ skus: subscriptionSkus });
    } catch (error) {
      errorLog({ message: "handleGetSubscriptions", error });
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
                  password: 'YourGENERATEDCodeGoesHere',
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
      <ScrollView>
        
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
        {/* <View style={styles.seperator} /> */}




        {customStyleIndex === 0 && (
          <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 28,
              textAlign: "center",
              paddingBottom: 15,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Subscribe
          </Text>
          <Text style={styles.listItem}>
            Subscribe to some cool stuff today.
          </Text>
          <Text
            style={
              (styles.listItem,
              {
                fontWeight: "500",
                textAlign: "center",
                marginTop: 10,
                fontSize: 18,
              })
            }
          >
            Choose your membership plan.
          </Text>
          <View style={{ marginTop: 10 }}>
            {subscriptions.map((subscription, index) => {
              const owned = purchaseHistory.find(
                (s) => s?.productId === subscription.productId,
              );
              console.log("subscriptions", subscription?.productId);
              return (
                <View style={styles.box} key={index}>
                  {subscription?.introductoryPriceSubscriptionPeriodIOS && (
                    <>
                      <Text style={styles.specialTag}>SPECIAL OFFER</Text>
                    </>
                  )}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        paddingBottom: 10,
                        fontWeight: "bold",
                        fontSize: 18,
                        textTransform: "uppercase",
                      }}
                    >
                      {subscription?.title}
                    </Text>
                    <Text
                      style={{
                        paddingBottom: 20,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {subscription?.localizedPrice}
                    </Text>
                  </View>
                  {subscription?.introductoryPriceSubscriptionPeriodIOS && (
                    <Text>
                      Free for 1{" "}
                      {subscription?.introductoryPriceSubscriptionPeriodIOS}
                    </Text>
                  )}
                  <Text style={{ paddingBottom: 20 }}>
                    {subscription?.description}
                  </Text>
                  {owned && (
                    <Text style={{ textAlign: "center", marginBottom: 10 }}>
                      You are Subscribed to this plan!
                    </Text>
                  )}
                  {owned && (
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "#0071bc" }]}
                      onPress={() => {
                        navigation.navigate("Home");
                      }}
                    >
                      <Text style={styles.buttonText}>Continue to App</Text>
                    </TouchableOpacity>
                  )}
                  {loading && <ActivityIndicator size="large" />}
                  {!loading && !owned && isIos && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setLoading(true);
                        handleBuySubscription(subscription.productId);
                      }}
                    >
                      <Text style={styles.buttonText}>Subscribe</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        )}
        {customStyleIndex === 1 && (
          <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 28,
              textAlign: "center",
              paddingBottom: 15,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Subscribe
          </Text>
          <Text style={styles.listItem}>
            Subscribe to some cool stuff today.
          </Text>
          <Text
            style={
              (styles.listItem,
              {
                fontWeight: "500",
                textAlign: "center",
                marginTop: 10,
                fontSize: 18,
              })
            }
          >
            Choose your membership plan.
          </Text>
          <View style={{ marginTop: 10 }}>
            {subscriptions.map((subscription, index) => {
              const owned = purchaseHistory.find(
                (s) => s?.productId === subscription.productId,
              );
              console.log("subscriptions", subscription?.productId);
              return (
                <View style={styles.box} key={index}>
                  {subscription?.introductoryPriceSubscriptionPeriodIOS && (
                    <>
                      <Text style={styles.specialTag}>SPECIAL OFFER</Text>
                    </>
                  )}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        paddingBottom: 10,
                        fontWeight: "bold",
                        fontSize: 18,
                        textTransform: "uppercase",
                      }}
                    >
                      {subscription?.title}
                    </Text>
                    <Text
                      style={{
                        paddingBottom: 20,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {subscription?.localizedPrice}
                    </Text>
                  </View>
                  {subscription?.introductoryPriceSubscriptionPeriodIOS && (
                    <Text>
                      Free for 1{" "}
                      {subscription?.introductoryPriceSubscriptionPeriodIOS}
                    </Text>
                  )}
                  <Text style={{ paddingBottom: 20 }}>
                    {subscription?.description}
                  </Text>
                  {owned && (
                    <Text style={{ textAlign: "center", marginBottom: 10 }}>
                      You are Subscribed to this plan!
                    </Text>
                  )}
                  {owned && (
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "#0071bc" }]}
                      onPress={() => {
                        navigation.navigate("Home");
                      }}
                    >
                      <Text style={styles.buttonText}>Continue to App</Text>
                    </TouchableOpacity>
                  )}
                  {loading && <ActivityIndicator size="large" />}
                  {!loading && !owned && isIos && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setLoading(true);
                        handleBuySubscription(subscription.productId);
                      }}
                    >
                      <Text style={styles.buttonText}>Subscribe</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        )}
        {customStyleIndex === 2 && (
          <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 28,
              textAlign: "center",
              paddingBottom: 15,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Subscribe
          </Text>
          <Text style={styles.listItem}>
            Subscribe to some cool stuff today.
          </Text>
          <Text
            style={
              (styles.listItem,
              {
                fontWeight: "500",
                textAlign: "center",
                marginTop: 10,
                fontSize: 18,
              })
            }
          >
            Choose your membership plan.
          </Text>
          <View style={{ marginTop: 10 }}>
            {subscriptions.map((subscription, index) => {
              const owned = purchaseHistory.find(
                (s) => s?.productId === subscription.productId,
              );
              console.log("subscriptions", subscription?.productId);
              return (
                <View style={styles.box} key={index}>
                  {subscription?.introductoryPriceSubscriptionPeriodIOS && (
                    <>
                      <Text style={styles.specialTag}>SPECIAL OFFER</Text>
                    </>
                  )}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        paddingBottom: 10,
                        fontWeight: "bold",
                        fontSize: 18,
                        textTransform: "uppercase",
                      }}
                    >
                      {subscription?.title}
                    </Text>
                    <Text
                      style={{
                        paddingBottom: 20,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {subscription?.localizedPrice}
                    </Text>
                  </View>
                  {subscription?.introductoryPriceSubscriptionPeriodIOS && (
                    <Text>
                      Free for 1{" "}
                      {subscription?.introductoryPriceSubscriptionPeriodIOS}
                    </Text>
                  )}
                  <Text style={{ paddingBottom: 20 }}>
                    {subscription?.description}
                  </Text>
                  {owned && (
                    <Text style={{ textAlign: "center", marginBottom: 10 }}>
                      You are Subscribed to this plan!
                    </Text>
                  )}
                  {owned && (
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "#0071bc" }]}
                      onPress={() => {
                        navigation.navigate("Home");
                      }}
                    >
                      <Text style={styles.buttonText}>Continue to App</Text>
                    </TouchableOpacity>
                  )}
                  {loading && <ActivityIndicator size="large" />}
                  {!loading && !owned && isIos && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setLoading(true);
                        handleBuySubscription(subscription.productId);
                      }}
                    >
                      <Text style={styles.buttonText}>Subscribe</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </View>
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

});


