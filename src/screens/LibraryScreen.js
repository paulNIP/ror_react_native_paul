import React ,{useState,useEffect} from "react";
import {View,FlatList,Image,ScrollView,Alert, Text,TouchableOpacity,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider} from '@rneui/themed';
import { getLibrary } from "../service/libraryService";
import { Button } from '@rneui/themed';
import EpubReader from "./EpubReader";
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { DatabaseConnection } from '../database/database-connection';


const db = DatabaseConnection.getdb();


const LibraryScreen = ({navigation}) => {

  const [books, setBooks] = useState([]);
  const [currentProgress, setProgress] = useState(0);
  const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {

      const fetchData = async () => {
          const data = await getLibrary()
          setBooks(data)

      }
      fetchData();

    }, []);

    const dayOfWeekName = new Date().toLocaleString(
      'default', {weekday: 'long'}
    );
    console.log(dayOfWeekName); // 👉️ Sunday


  const renderBooks = ({ item }) => {

    const imgr = item.book_image;

    const book = item.title+'.epub';
    return (

      <View style={{marginEnd:10,width:100}}>
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
              <View >
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.title}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.author}</Text>
              </View>

              {/* check if file is already downloaded */}
              
              
              <View style={{backgroundColor:'#F9A825',marginStart:10,marginEnd:10,height:20, borderRadius:50}}>              
                <TouchableOpacity onPress={()=>{navigation.navigate('EpubReader',{
                  file: item.url
                })}}>
                  <Text style={{alignSelf:"center",fontSize:8,color:'white',marginTop:5}}>Read Book</Text>
                </TouchableOpacity>
                </View> 

              {/* check if file is already downloaded */}
              
              
              
              <View style={{backgroundColor:'#F9A825',marginStart:10,marginEnd:10,height:20, borderRadius:50, marginTop:5}}>
              <TouchableOpacity 
              onPress={()=>{
                const url = item.url;
                const filePath = RNFS.DocumentDirectoryPath + url.split("/").pop();

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
            </View>


            
                <View style={{backgroundColor:'#FF0000',marginStart:10,marginEnd:10,marginTop:5,height:20,marginBottom:5, borderRadius:50,borderStyle:"solid"}}>
                  <TouchableOpacity onPress={()=>{
                    // Optional: Delete the file if it exists before downloading
                    const url = item.url;
                    const filePath = RNFS.DocumentDirectoryPath + url.split("/").pop();
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
                </View> 
            

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
        <View style={{ flexDirection: 'row',backgroundColor:"#F9A825"}}>
          <View style={{  alignSelf:"flex-start"}}>
            <Text>
              1 Books in your Library
            </Text>

          </View>
          <View style={{ flexDirection: 'row',alignSelf:"flex-end",marginLeft:'auto' }}>
            <Divider orientation="vertical" width={5} />
            <TouchableOpacity>
              <MaterialCommunityIcons  name="view-comfy" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons  name="view-list" size={30} color="white" />
            </TouchableOpacity>
          </View>
         </View>
        <ScrollView showsHorizontalScrollIndicator={false} style={{padding:10}}>
      
         <FlatList data={books} renderItem={renderBooks} numColumns={3} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
         </ScrollView>
    </View>
  );
};

export default LibraryScreen;