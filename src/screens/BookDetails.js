import React , { useEffect, useState } from 'react';
import {StyleSheet,ScrollView,View,Text,Image,Alert,FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider} from '@rneui/themed';
import { Button } from '@rneui/themed';
import Strings from '../constants/Strings';
import { getBookDetails } from '../service/libraryService';
import {Dimensions} from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import SnackBar from 'react-native-snackbar-component';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
import { Platform } from 'react-native';
import * as RNIap from 'react-native-iap';




const BookDetails = ({ route, navigation }) => {

  const { book_id } = route.params;

  const [book, setBook] = useState();
  const [visible, setVisible] = useState(false);
  const [favouritesColor, setFavouritesColor] = useState('#808080');
  const db = DatabaseConnection.getdb();
  const [progress, setProgress] = useState(0);


    useEffect(() => {


        const fetchData = async () => {
            const data = await getBookDetails(book_id);
            setBook(data);
  
        }
        fetchData();
  
      }, []);


      const purchaseProduct = async (productId) => {
        try {
          const purchase = await RNIap.requestPurchase(productId);
          console.log('Purchase:', purchase);
          // Handle successful purchase
        } catch (error) {
          console.log('Error purchasing:', error.message);
          // Handle purchase error
        }
      };


      const downloadFile = () => {
        const url = 'https://rhapsodyofrealities.b-cdn.net/app/books/rork-february-german.pdf';
        const filePath = RNFS.DocumentDirectoryPath + '/rork-february-german.pdf';
    
        RNFS.downloadFile({
          fromUrl: url,
          toFile: filePath,
          background: true, // Enable downloading in the background (iOS only)
          discretionary: true, // Allow the OS to control the timing and speed (iOS only)
          progress: (res) => {
            // Handle download progress updates if needed
            // const progress = (res.bytesWritten / res.contentLength) * 100;
            setProgress((res.bytesWritten / res.contentLength) * 100);
            console.log(`Progress: ${progress.toFixed(2)}%`);
          },
        })
          .promise.then((response) => {
            console.log('File downloaded!', response);
          })
          .catch((err) => {
            console.log('Download error:', err);
          });
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
                    <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, 
                      flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
                  </View>
                  <Text style={{ marginBottom: 5,fontSize:10}}>
                      By {item.author_name}
                  </Text>
                </View>
                </View>
              </TouchableOpacity>
          </View>
        );
      };



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


        return (
    
          <View>
                <Image
                     style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height*0.25}}
                     source={{uri: bg}} 
                    //  resizeMode={"cover"} 
                />
                <View style={{flexDirection:"row",marginLeft:10,marginBottom:10}}>
                    <Image
                        style={{width: Dimensions.get('window').width*0.2, height: 150,borderRadius: 10, marginTop:-100}}
                        source={{uri: cover}} 
                        // resizeMode={"cover"} 
                    />
                    <View style={{marginTop:-50,marginBottom:20}}>
                        <TouchableOpacity style={{backgroundColor:'#C0C0C0'}}>
                        <Text style={{marginLeft:10,color:'#FFFFFF',fontWeight:'bold'}}>{item.book_title}</Text>
                        <Text style={{marginLeft:10, color:'#FFFFFF'}}>By {item.author_name}</Text>
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
                                console.log("product ID",product);
                                purchaseProduct(product);
                               
                              }}
                               >
                                <Text style={{color:'#FFFFFF',fontWeight:'bold'}}>BUY US ${item.price}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderRadius: 4,padding:4,height:30,justifyContent:'center',alignContent:'center',
                                                  backgroundColor: '#D8A623'}}>
                            <Text style={{color:'#FFFFFF',fontWeight:'bold'}}>VOUCHER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Divider/>
                <View style={{flexDirection:"row",justifyContent:"space-around", marginTop:5,marginBottom:5}}>
                    <View>
                      <TouchableOpacity  onPress={()=>{
                        

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
            Alert.alert(
              'Success',
              'Added to Favourites',
              [
                {
                  text: 'Ok'
                },
              ],
              { cancelable: false }
            );
            // setVisible(true);


          }else{
            Alert.alert(
              'Success',
              'Book already exists in favourites',
              [
                {
                  text: 'Ok'
                },
              ],
              { cancelable: false }
            );

          }
        }
      );
    });

                             

                      }}>
                        <MaterialCommunityIcons  style={{alignSelf:"center"}} name="cards-heart" size={30} color={favouritesColor} />
                        <Text style={{alignSelf:"center"}}>Favourite</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity onPress={downloadFile}
                      >
                        <MaterialCommunityIcons style={{alignSelf:"center"}} name="cloud-download" size={30} color="#5D3FD3" />
                        <Text style={{alignSelf:"center"}}>Download</Text>
                        </TouchableOpacity>
                        <Progress.Pie progress={progress} size={50} />
                        <Text>{Math.round(progress * 100)}%</Text>
                    </View>
                    <View>
                     <TouchableOpacity  onPress={()=>{}}>

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
                <Text style={{marginTop:10,marginLeft:20}}>{item.book_description}</Text>

                <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
                <Divider orientation="vertical" width={5} />
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{marginBottom:15,alignItems:'flex-start'}}>
                        <Text style={{marginLeft:10,fontWeight:'bold'}}>RELATED BOOKS</Text>
                        <Text style={{marginLeft:10,color:'#999999'}}>Books related to the title above</Text>
                    </View>
                    <View style={{marginBottom:15,alignItems:'flex-end'}}>
                        <Button title="VIEW ALL" type="outline"  color="warning" />
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
                </ScrollView>

        </SafeAreaView>

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  });

export default BookDetails;