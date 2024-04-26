import React , { useEffect, useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Modal,
    Pressable,
    ActivityIndicator,Platform
} from 'react-native';
import { SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, { BottomSheetView,BottomSheetTextInput, } from '@gorhom/bottom-sheet';
import { Divider} from '@rneui/themed';
import { Button } from '@rneui/themed';
import { getBookDetails } from '../service/libraryService';
import {Dimensions} from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import SnackBar from 'react-native-snackbar-component';
import RNFS from 'react-native-fs';
import {
    PurchaseError,
    requestSubscription,
    useIAP,
    validateReceiptIos,
  } from "react-native-iap";

  const errorLog = ({ message, error }) => {
    console.error("An error happened", message, error);
  };
  
  const isIos = Platform.OS === "ios";
  

  
import AsyncStorage from "@react-native-async-storage/async-storage";
import Strings from '../constants/Strings';



const BookDetails = ({ route, navigation }) => {

  
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

  const book_id = route.params.book_id;
  const title  = route.params.title;
  const sku  = route.params.code;

  console.log("Apple product ID mdnddjjdjdjdj ",sku);
      //product id from appstoreconnect app->subscriptions
  const subscriptionSkus = Platform.select({
        ios: [sku],
    });

  const [book, setBook] = useState();
  const [visible, setVisible] = useState(false);
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [favouritesColor, setFavouritesColor] = useState('#808080');
  const db = DatabaseConnection.getdb();
  const [progress, setProgress] = useState(0);
  const bottomSheetThemeRef = React.useRef<BottomSheet>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [bookExist, setBookExist] = useState(false);
  const bottomSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ['50%', '75%', '100%'], []);



    useEffect(() => {
        const fetchData = async () => {
            const data = await getBookDetails(book_id);
            setBook(data);
            let url = book[0].book_file_url;
            // Check if the file already exists
            const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+url.split("/").pop();
            const fileExists = await RNFS.exists(EPUB_PATH);
            if (fileExists) {
                setBookExist(true);

            } else {

            }

        }

        fetchData();
        navigation.setOptions({
          title: title,
        });
  
      }, [navigation]);




  const [loading, setLoading] = useState(false);

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
                  password: Strings.APP_SHARED_SECRET
                },
                isTestEnvironment,
              );

              //if receipt is valid
            //   if (appleReceiptResponse) {
            //     const { status } = appleReceiptResponse;
            //     if (status) {
            //       navigation.navigate("Home");
            //     }
            //   }

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





    //   const purchaseProduct = async (productId) => {
    //       const email = await AsyncStorage.getItem('email')
    //       if(email){
    //           try {
    //               const purchase = await RNIap.requestPurchase(productId);
    //               console.log('Purchase:', purchase);
    //           } catch (error) {
    //               console.log('Error purchasing:', error.message);
    //           }
    //       }else{
    //           navigation.navigate('Login')
    //       }
    //   };


    const downloadFile = async (url) => {
        const email = await AsyncStorage.getItem('email');
        if (email) {
            const fileName = url.split("/").pop();
            const filePath = RNFS.DocumentDirectoryPath + '/' + fileName; // Ensure you have the '/' between the directory path and file name

                RNFS.downloadFile({
                    fromUrl: url,
                    toFile: filePath,
                    background: true, // Enable downloading in the background (iOS only)
                    discretionary: true, // Allow the OS to control the timing and speed (iOS only)
                    progress: (res) => {
                        // Handle download progress updates if needed
                        setDownloadVisible(true);
                        const progress00 = (res.bytesWritten / res.contentLength) * 100;
                        setProgress(progress00);
                        console.log(`Progress: ${progress00.toFixed(2)}%`);
                    },
                })
                    .promise.then((response) => {
                    setDownloadVisible(false);
                    setAlertTitle("Success")
                    setAlertMessage("The book download is complete and it is now available in your app library.")
                    setModalVisible(true)
                })
                    .catch((err) => {
                        console.log('Download error:', err);
                    });
        } else {
            navigation.navigate('Login');
        }
    };


      const renderRelatedBooks = ({ item }) => {
        const imgr = item.book_cover_img;
        return (
          <View style={{marginEnd:10,width:100}}>
            <TouchableOpacity onPress={()=>navigation.push('BookDetails',{book_id:item.id})}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
                <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                    <Image
                      source={{uri:imgr}}
                      style={{
                        height: 150,
                        width: 100
                      }}
                      // resizeMode="contain"
                    />
                  <View style={{height:50}}>
                    <Text style={styles.RelatedBookTitle} numberOfLines={5}>{item.book_title}</Text>
                  </View>
                </View>
                </View>
              </TouchableOpacity>
          </View>
        );
      };

    const CustomAlert = (props) => {
        const [iOSDefaults, setIOSDefaults] = useState({
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
                <View style={[styles.iOSButtonGroup, {
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
                                <View style={[styles.iOSButton, singleButtonWrapperStyle]}>
                                    <Pressable onPress={() => {
                                        props.setModalVisible(false)
                                        if (item.func && typeof (item.func) === 'function')
                                            item.func();
                                    }}>
                                        <View
                                            style={[styles.iOSButtonInner, {backgroundColor: (item.styles && item.styles.backgroundColor) || iOSDefaults.button.backgroundColor}]}>
                                            <Text
                                                style={{
                                                    color: (item.styles && item.styles.color) || iOSDefaults.button.color,
                                                    fontFamily: (item.styles && item.styles.fontFamily) || iOSDefaults.button.fontFamily,
                                                    fontSize: (item.styles && item.styles.fontSize) || iOSDefaults.button.fontSize,
                                                    fontWeight: (item.styles && item.styles.fontWeight) || singleButtonWeight,
                                                    textTransform: (item.styles && item.styles.textTransform) || iOSDefaults.button.textTransform,
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
                    style={[ styles.iOSBackdrop , styles.backdrop ]}
                    onPress={() => props.setModalVisible(false)}/>
                <View style={styles.alertBox}>
                    {
                            <View style={[styles.iOSAlertBox, iOSDefaults.container]}>
                                <Text style={[styles.iOSTitle, iOSDefaults.title]}>{props.title || 'Message'}</Text>
                                <Text style={[styles.iOSMessage, iOSDefaults.message]}>{props.message || ''}</Text>
                                <IOSButtonBox/>
                            </View>
                    }
                </View>
            </Modal>
        )
    }


    const renderBook = ({ item }) => {
        console.log("Selected Book Details" ,item);
        const bg=item.book_bg_img;
        const cover=item.book_cover_img;
        const id=item.id;
        const book_title=item.book_title;
        const book_description=item.book_description;
        const book_bg_img=item.book_bg_img;
        const book_cover_img=item.book_cover_img;
        const book_file_type=item.book_file_type;
        const book_file_url=item.book_file_url;
        const total_rate=item.total_rate;
        const rate_avg=item.rate_avg;
        const book_views=item.book_views;
        const author_name=item.author_name;
        const product=item.apple_product_code;
        const price =item.price;

        return (
          <View>

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

                <Image
                     style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height*0.25}}
                     source={{uri: bg}} 
                    //  resizeMode={"cover"} 
                />
                <View style={{flexDirection:"row",marginLeft:10,marginBottom:10}}>
                    <Image
                        style={{width: Dimensions.get('window').width*0.27, height: 180,borderRadius: 10, marginTop:-100}}
                        source={{uri: cover}} 
                        // resizeMode={"cover"} 
                    />
                    <View style={{marginTop:-50,marginBottom:20}}>
                        <TouchableOpacity style={{backgroundColor:'#050505', paddingTop:15, paddingBottom : 15, paddingRight: 10 }}>
                        <Text style={styles.BookTitle}>{item.book_title}</Text>
                        <Text style={styles.BookAuthor}>By {item.author_name}</Text>
                        </TouchableOpacity>

                        <View style={{flexDirection:"row",alignContent:"space-between",marginTop:10,marginLeft:15}}>
                            {/* <TouchableOpacity style={{borderRadius: 4,padding:4,height:40,
                                                  backgroundColor: '#D8A623',marginEnd:20,justifyContent:'center',alignContent:'center'}}>
                            <Text style={{marginLeft:10,marginRight:10}}>PRICE : </Text>
                            </TouchableOpacity> */}
                           
                           <TouchableOpacity style={{borderRadius: 4,padding:4,height:30,
                                                  backgroundColor: '#D8A623',
                               marginEnd:10,justifyContent:'center',alignContent:'center'}}
                               
                               onPress={()=>{
                                bottomSheetRef.current?.snapToIndex(0);
                                // console.log("product ID",product);
                                // // purchaseProduct(product);
                                // bottomSheetRef
                               
                              }}
                               >
                                <Text style={{color:'#FFFFFF',fontWeight:'500', paddingRight : 10, paddingLeft : 10, fontSize:12 }}>BUY ${item.price}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <Divider/>
                <View style={{flexDirection:"row",justifyContent:"space-around", marginTop:5,marginBottom:5}}>
                    <View>
                      <TouchableOpacity  onPress={()=>{
                          const email = AsyncStorage.getItem('email')
                          if(email){
                              db.transaction(function (txn) {
                                  txn.executeSql(
                                      "SELECT id FROM favourite_books WHERE id=?",
                                      [item.id],
                                      function (tx, res) {
                                          console.log('item:', res.rows.length);
                                          if (res.rows.length == 0) {
                                              //insert into DB
                                              txn.executeSql(
                                                  'INSERT INTO favourite_books (book_title,book_description, image, cover_image,book_file_type,book_file_url , book_rate ,book_rate_avg,book_view, book_author_name) VALUES(? ,?,?, ?, ?,? , ? ,?,?, ?)',
                                                  [
                                                      book_title,
                                                      book_description,
                                                      book_bg_img,
                                                      book_cover_img,
                                                      book_file_type,
                                                      book_file_url,
                                                      total_rate,
                                                      rate_avg,
                                                      book_views,
                                                      author_name]
                                              );

                                              setFavouritesColor('#FF0000');
                                              setAlertTitle("Success")
                                              setAlertMessage("This book has been added to your favourite books.")
                                              setModalVisible(true)
                                              // setVisible(true);
                                          }else{
                                              setAlertTitle("Book Exists")
                                              setAlertMessage("This book already exists in your favourite books list.")
                                              setModalVisible(true)

                                          }
                                      }
                                  );
                              });
                          }else{
                              navigation.navigate('Login')
                          }

                      }}>
                        <MaterialCommunityIcons  style={{alignSelf:"center"}} name="cards-heart" size={30} color={favouritesColor} />
                        <Text style={{alignSelf:"center"}}>Favourite</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {!bookExist &&(
                            <TouchableOpacity onPress={()=>{
                                setDownloadVisible(true);
                                downloadFile(item.book_file_url)
                            }}>
                              <MaterialCommunityIcons style={{alignSelf:"center"}} name="cloud-download" size={30} color="#5D3FD3" />
                              <Text style={{alignSelf:"center"}}>Download</Text>
                              </TouchableOpacity>

                        )}
                      
                    </View>
                    <View>
                     <TouchableOpacity  onPress={()=>{
                         //openBook()
                         if(price===0){
                            const url=item.url;
                            const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+url.split("/").pop();
                            navigation.navigate('EpubReader',{file2: EPUB_PATH,location:null})

                         }else{
                            //Buy and if buy is sucess navigate to reader
                            // bottomSheetThemeRef.current?.snapToIndex(0);
                            handleBuySubscription(sku);

                         }
                         
                     }}>
                        <MaterialCommunityIcons style={{alignSelf:"center"}} name="file-multiple-outline" size={30} color="#9AC4F8" />
                        <Text style={{alignSelf:"center"}} >Read</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <TouchableOpacity  onPress={()=>navigation.navigate("FeedBack",{book_id:item.id})}>
                        <MaterialCommunityIcons style={{alignSelf:"center"}} name="information" size={30} color="#D8A623" />
                        <Text style={{alignSelf:"center"}} >FeedBack</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <Divider/>
                <Text style={{marginTop:10,marginLeft:10,fontSize:20,fontWeight:"bold"}}>Description</Text>
                <Divider/>
                <Text style={styles.BookDescription}>{item.book_description}</Text>

                <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:30,marginBottom:0,alignContent:'space-between' }}>
                <Divider orientation="vertical" width={5} />
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{marginBottom:15,alignItems:'flex-start'}}>
                        <Text style={styles.CategoryTitle}>RELATED BOOKS</Text>
                        <Text style={styles.CategorySubTitle}>Books related to the title above</Text>
                    </View>
                    <View style={{marginBottom:0,alignItems:'flex-end'}}>
                        <Button title="VIEW ALL" type="outline"  color="warning"   titleStyle={styles.StoreViewAllButton} />
                    </View>
                </View>

                
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
                    <FlatList data={item.related_books} renderItem={renderRelatedBooks} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
                </ScrollView>

                
      <SnackBar visible={visible} textMessage="Added to Favourites" 
        actionHandler={()=>{setVisible(false);}} actionText="OKAY"/>
          
          </View>
        );
      };

  return (

        <SafeAreaView style={styles.container}>

                <ScrollView showsVerticalScrollIndicator={false}
                >
                   <FlatList data={book} renderItem={renderBook}  ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
                   {downloadVisible && (
                        <View style={{
                        position: "absolute",
                        height:50,
                        bottom: Dimensions.get('window').height * 0.45,
                        top:Dimensions.get('window').height * 0.45,
                        right: Dimensions.get('window').width * 0.25,
                        left: Dimensions.get('window').width * 0.25,
                        alignContent:'center',justifyContent:'center',
                        backgroundColor:'#000',
                        opacity:0.25
                        }}>
                        <ActivityIndicator color="gray"/>
                        <Text style={{color:'white',alignSelf:'center',fontWeight:'bold'}}>{progress} %</Text>
                        <Text style={{color:'white',alignSelf:'center',fontWeight:'bold'}}>Downloading Book ...</Text>
            
                        </View>

                     )}

                    <BottomSheet
                            ref={bottomSheetRef}
                            index={-1}
                            snapPoints={snapPoints}
                            keyboardBehavior="fillParent"
                            enablePanDownToClose
                            onClose={() => {
                            }}
                        >
                            <BottomSheetView style={styles.contentContainer}>
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
                                                handleBuySubscription("7SpiritsOfGodNew");
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

                            </BottomSheetView>
                    </BottomSheet>




                </ScrollView>

        </SafeAreaView>

  );


};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : '#ffffff'
    },
    absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    BookTitle : {
        marginLeft:10,
        color:'#FFFFFF',
        fontWeight:'500',
        fontSize : 18
    },
    BookAuthor : {
        marginLeft:10,
        color:'#e3a709',
        fontWeight:'200',
        fontSize : 12,
    },
    BookDescription : {
        fontFamily : 'Roboto',
        fontSize:16,
        lineHeight:22,
        paddingLeft:20,
        paddingRight :20,
        paddingTop :10 ,
        fontWeight :'300',
        color : '#000000',
        marginTop:10,
        marginLeft:10
    },
    CategoryTitle : {
        marginLeft: 10,
        fontWeight: '600',
        fontSize : 16,
        color :'#52565e',
        textTransform : 'uppercase'
    },
    CategorySubTitle : {
        marginLeft: 10,
        color: '#999999',
        fontWeight : '400',
        fontSize:13
    },
    StoreViewAllButton :{
        fontSize: 12
    },
    RelatedBookTitle : {
        marginBottom: 5,
        marginTop:5,
        flexWrap: 'wrap',
        alignSelf:'center',
        fontSize : 10,
        textTransform : 'uppercase'
    },
    menuText : {
        alignSelf:"center",
    },

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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
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



export default BookDetails;