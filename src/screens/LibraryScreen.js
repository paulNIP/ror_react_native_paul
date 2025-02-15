import React ,{useState,useEffect} from "react";
import {View,FlatList,Image,ScrollView,Alert, Text,TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider} from '@rneui/themed';
import { getLibrary } from "../service/libraryService";
import RNFS from 'react-native-fs';
import { DatabaseConnection } from '../database/database-connection';
import {Dimensions} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderKit from 'react-native-loader-kit';
import LoadingComponent from "../components/LoadingComponent";


const db = DatabaseConnection.getdb();


const LibraryScreen = ({navigation}) => {

  const [books, setBooks] = useState([]);
  const [currentProgress, setProgress] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [listAlign, setListAlign] = useState(false);
  const [booksNo, setBooksNo] = useState([]);
  const [email, setEmail] = useState();
  const [bookExists, setBookExists] = useState();
  const [downloading, setDownloading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
          const data = await getLibrary();
          
          setBooks(data);

          const mail= await AsyncStorage.getItem('email');
          setEmail(mail);
          if(mail==null){
            setLoggedIn(false);
          }else{
            setLoggedIn(true);
          }
      }

      fetchData();

      const setData = async () => {
        let bkurl=books[0].url;
        let bk =bkurl.split("/").pop();
        const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+bk;
        const exists = await RNFS.exists(EPUB_PATH);
        if (exists) {
          setBookExists(true);
        } else {
          setBookExists(false);
          
        }

      }

      const interval = setInterval(() => {
        setData();
      }, 3000);
  
      return () => clearInterval(interval);

    }, []);

    const dayOfWeekName = new Date().toLocaleString(
      'default', {weekday: 'long'}
    );
    console.log("Books",books); // 👉️ Sunday


  const renderBooks = ({ item }) => {

    const imgr = item.book_image;

    console.log("hghdhhdhhdhhdhhd",item.url);

    return (

      <View style={{marginEnd:10,width:Dimensions.get('window').width*0.25}}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr}}
                  style={{
                    height: Dimensions.get('window').height*0.2,
                    width: Dimensions.get('window').width*0.25
                  }}
                  // resizeMode="contain"
                />
              <View >
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.title}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.author}</Text>
              </View>

              {/* check if file is already downloaded */}
              
              {bookExists &&(
                <View style={{backgroundColor:'#F9A825',marginStart:10,marginEnd:10,height:20, borderRadius:50}}>              
                <TouchableOpacity onPress={()=>{
                    const url=item.url;
                    const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+url.split("/").pop();
                    navigation.navigate('EpubReader',{file2: EPUB_PATH,location:null});
                  
                  }}>
                  <Text style={{alignSelf:"center",fontSize:8,color:'white',marginTop:5}}>Read Book</Text>
                </TouchableOpacity>
                </View> 

              )}
              {/* check if file is already downloaded */}
              
              
              {!bookExists &&(
              <View style={{backgroundColor:'#F9A825',marginStart:10,marginEnd:10,height:20, borderRadius:50,
               marginTop:5,marginBottom:5}}>
              <TouchableOpacity 
              onPress={()=>{
                setDownloading(true);
                const url = item.url;
                const filePath = `${RNFS.DocumentDirectoryPath}/` + url.split("/").pop();

                RNFS.downloadFile({
                  fromUrl: item.url,
                  toFile: filePath,
                  background: true, // Enable downloading in the background (iOS only)
                  discretionary: true, // Allow the OS to control the timing and speed (iOS only)
                  progress: (res) => {
                    // Handle download progress updates if needed
                    const progress = (res.bytesWritten / res.contentLength) * 100;
                    console.log(`Progress: ${progress.toFixed(2)}%`);
                  },
                })
                  .promise.then((response) => {
                    console.log('File downloaded!', response);
                    //insert data into the database
                    setDownloading(false);

                    db.transaction(function (tx) {
                      tx.executeSql(
                        'INSERT INTO book_download (book_download_title,image_download,book_download_author_name,book_download_url) VALUES (?,?,?,?)',
                        [url.split("/").pop(), item.book_image, item.author,filePath],
                        (tx, results) => {
                          console.log('Results', results.rowsAffected);
                          if (results.rowsAffected > 0) {
                            Alert.alert(
                              'Success',
                              'Added Successfully to Library',
                              [
                                {
                                  text: 'Ok'
                             
                                },
                              ],
                              { cancelable: false }
                            );
                          } else alert('Failed to Insert to Library');
                        }
                      );
                    });

                  })
                  .catch((err) => {
                    console.log('Download error:', err);
                    Alert.alert(
                      'Error',
                      'Download Error',
                      [
                        {
                          text: 'Ok'
                     
                        },
                      ],
                      { cancelable: false }
                    );
                  });
                
              }}>
                <Text style={{alignSelf:"center",color:'white',fontSize:8,marginTop:5}}>Download</Text>
              </TouchableOpacity>
            </View>)}


            {bookExists &&(
                <View style={{backgroundColor:'#FF0000',marginStart:10,marginEnd:10,marginTop:5,height:20,marginBottom:5, borderRadius:50,borderStyle:"solid"}}>
                  <TouchableOpacity onPress={()=>{
                    // Optional: Delete the file if it exists before downloading
                    const url = item.url;
                    const filePath = `${RNFS.DocumentDirectoryPath}/` + url.split("/").pop();
                    RNFS.unlink(filePath)
                      .then(() => {
                        Alert.alert('File deleted');
                      })
                      .catch((err) => {
                        console.log(err.message);
                      });

                  }}>
                    <Text style={{alignSelf:"center",color:'white',fontSize:8,marginTop:5}}>Delete Book</Text>
                  </TouchableOpacity>
                </View> )}
            

            </View>
            </View>
    </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#D8D9DA',
    },
    
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });




  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row',backgroundColor:"#D8A623",height:50}}>
          <View style={{  alignSelf:"flex-start",justifyContent:'center',alignSelf:'center'}}>
          {email!=="" ? (
            <Text style={{color:'#FFFFFF',marginLeft:10}}>
               {books.length} Books in your Library
            </Text>):(
              <Text style={{color:'#FFFFFF',marginLeft:10}}>
              0 Books in your Library
            </Text>

            )}

          </View>
          {email !==""? (
          <View style={{ flexDirection: 'row',alignSelf:"flex-end",marginLeft:'auto',justifyContent:'center',alignSelf:'center' }}>
            <Divider orientation="vertical" width={2} />
            <TouchableOpacity onPress={()=>{
              setListAlign(false);
            }}>
              <Icon  name="view-comfy" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              setListAlign(true);
            }}>
              <Icon  name="view-list" size={30} color="white" />
            </TouchableOpacity>
          </View>
          
            
            ):null
          } 

         </View>
         {email !==""? (
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{padding:10}}>
            {!listAlign &&(
            <FlatList data={books} renderItem={renderBooks} numColumns={3} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>)}
      
          
          {
              listAlign && books.map((l, i) => {


                // Check if file is downloaded for app folder
                const url = l.url;
                const filePath = `${RNFS.DocumentDirectoryPath}/` + url.split("/").pop();

                return i === 0 ?
                
          <View>
            <View style={{flexDirection:'row'}}>
              <View style={{width:Dimensions.get('window').width*0.3,
                    borderRadius: 5, overflow: "hidden" }}>
              <Image
                  source={{uri:l.book_image}}
                  style={{
                    height: Dimensions.get('window').height*0.2,
                    width: '100%'
                  }}
                  // resizeMode="contain"
                />

              </View>
              <View style={{width:Dimensions.get('window').width*0.65,marginLeft:10}}>
                <View >

                     <Text style={{flexWrap:'wrap',marginBottom:5}}>{l.title}</Text>
                     <Text style={{flexWrap:'wrap',marginBottom:5,color:'#A9A9A9'}} numberOfLines={3}>
                      {l.book_description}</Text>
                     <Text style={{flexWrap:'wrap',marginBottom:5,color:'#A9A9A9'}}>{l.author}</Text>

                     <View style={{marginTop:Dimensions.get('window').height*0.02}}>
                     <Divider style={{width:'90%',color:'#DAA520'}} color='#A9A9A9' width={1}/>

                     {!bookExists&&(

                      <TouchableOpacity onPress={()=>{}} 
                              style={{      
                              alignItems: 'center',
                              backgroundColor: '#D8A623',
                              height: 30,
                              width:130,
                              borderRadius:15,
                              marginTop: 5,
                              marginRight:10,
                              justifyContent: 'center'}}>

                          <Text style={{alignSelf:"center",color:"#FFFFFF"}}>Download Book</Text>
                     </TouchableOpacity> 

                     )}
                     

                    
                    <View>
                     <View style={{flexDirection:'row',marginTop:5}}>
                         <Icon  name="timer-outline" size={25} color="#A9A9A9" />
                         <Text style={{flexWrap:'wrap',marginBottom:5,marginTop:5,color:'#A9A9A9'}}>Already Downloaded</Text>
                     </View> 
                     <View style={{flexDirection:'row'}}>
                        {bookExists &&(
                         <TouchableOpacity onPress={()=>{
                          const url=item.url;
                          const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+url.split("/").pop();
                          navigation.navigate('EpubReader',{file2: EPUB_PATH,location:null});
                          
                         }} 
                              style={{      
                              alignItems: 'center',
                              backgroundColor: '#D8A623',
                              height: 30,
                              width:130,
                              borderRadius:15,
                              marginTop: 5,
                              marginRight:10,
                              justifyContent: 'center'}}>

                          <Text style={{alignSelf:"center",color:"#FFFFFF"}}>Open / Read Book</Text>
                         </TouchableOpacity>
                         )}

                       {bookExists &&(
                         <TouchableOpacity onPress={()=>{
                           // Optional: Delete the file if it exists before downloading
                          const url = item.url;
                          const filePath = `${RNFS.DocumentDirectoryPath}/` + url.split("/").pop();
                          RNFS.unlink(filePath)
                            .then(() => {
                              Alert.alert('File deleted');
                            })
                            .catch((err) => {
                              console.log(err.message);
                            });

                         }} 
                            style={{      
                              alignItems: 'center',
                              backgroundColor: '#FFFFFF',
                              borderBlockColor:'red',
                              height: 30,
                              width:130,
                              borderRadius:15,
                              marginTop: 5,
                              justifyContent: 'center'}}
                              >
                          <Text style={{alignSelf:"center",color:'red'}}>Delete Book</Text>
                         </TouchableOpacity>)}
                         
                     </View>
                     </View>


                     </View>

                </View>
                
              </View>

            </View>
          </View> : null})}
          {downloading&&(

            <LoadingComponent/>
          )}

          </ScrollView>
         ):
         (<ScrollView showsHorizontalScrollIndicator={false}  
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',alignItems:'center' }}>
              <Text>You Currently have no books in your Library</Text>
      
          
           </ScrollView>)}
        
    </View>
  );
};

export default LibraryScreen;