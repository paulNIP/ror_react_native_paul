import { useState ,useEffect} from 'react';
import React from 'react';
import {
  StyleSheet,
  Text,Modal,
  SafeAreaView,View,
  ScrollView,
  StatusBar,TouchableOpacity,TextInput,Dimensions, Alert,FlatList
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import BottomSheet, { BottomSheetView,BottomSheetTextInput, } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'react-native-snackbar-component';
import { DatabaseConnection } from '../database/database-connection';
import uuid from 'react-native-uuid';
import VersionCheck from 'react-native-version-check'
import DeviceInfo from 'react-native-device-info'
import axios from 'axios';

const AppNotes =() =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [notesVisible, setNotesVisible] = useState(true);
    const [text, onChangeText] = useState('');
    const [textBody, onChangeBodyText] = useState('');
    const [msg, setMsg] = useState('');
    let [NoteItems, setNoteItems] = useState([]);

    const [edittextid, setEditTextID] = useState('')
    const [edittext, setEditText] = useState('');
    const [edittextBody, setEditBodyText] = useState('');


    const db = DatabaseConnection.getNotesDB();
    const snapPoints = React.useMemo(() => ['50%', '75%', '100%'], []);

    const bottomSheetRef = React.useRef(null);
    const bottomSheetRefEdit = React.useRef(null);

    useEffect(() => {
      const fetchNotes = async () => {
          const email = await AsyncStorage.getItem('email');
          axios.post('https://backend3.rhapsodyofrealities.org/get/notes', {"email":email})
          .then(function (response) {
            setNoteItems(response.data.result);
          })
          .catch(function (error) {
            console.log(error);
          });




          //select all notes previous DB
          // db.transaction((tx) => {
          //   tx.executeSql(
          //     'SELECT * FROM notes WHERE email=?',
          //     [email],
          //     (tx, results) => {
          //       var temp = [];
          //       for (let i = 0; i < results.rows.length; i++)
          //         var hightlight=results.rows.item(i);
          //         temp.push(hightlight);
          //         setNoteItems(temp);
          //     }
          //   );
          // });

      }
      

      const interval = setInterval(() => {
        fetchNotes();
      }, 3000);

      return () => clearInterval(interval);



    }, []);

    const insertNote =async()=>{
      if(text===''){
       setMsg('Please add Note Title to save');
       setToastVisible(true);
       Alert.alert('Please add Note Title to save');
      }else{
              // Update 
      const options = { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long' };
      const today = new Date().toLocaleDateString("en-US", options);

        // Log to console
        const noteDate =today.toString().replaceAll(",","");
        const note_id =Math.floor(Math.random() * 2000000).toString();
        const email =await AsyncStorage.getItem('email');

       // const epub
     
      db.transaction((tx => {
        tx.executeSql(
'INSERT INTO notes (title, note_id, body, action, note_type,note_date,email) VALUES (?, ?,?,?,?,?,?)',
          [ text,
            note_id,
            textBody,
            "insert",
            "Other",
            noteDate,
            email
          ],
          (tx, results) => {
            console.log('INSERT successfull');
            bottomSheetRef.current?.close()
            
          },
          (error) => {
            console.error('Error executing INSERT SQL: ', error);
          }
        );
      }));

      }




    }


    const syncNote =async(querytitle)=>{
      console.log("hshshshsh",querytitle);
      const email = await AsyncStorage.getItem('email');
      db.transaction(function (txn) {
        txn.executeSql(
          "SELECT * FROM notes WHERE title=? AND email=?",
          [querytitle,email],
          function (tx, res) {
            console.log('item:', res.rows.length);

          }
        );
      });
          db.transaction(tx2 => {
            tx2.executeSql(
              'SELECT * FROM notes WHERE title LIKE ?',
              ['%'+querytitle+'%'], // Replace 'search_term' with the term you want to search for
              (tx2, results2) => {
                const len = results2.rows.length;
                for (let i = 0; i < len; i++) {
                  const row = results2.rows.item(i);
                  // Do something with the retrieved data
                  // console.log("Result ---hdhbdbdbd",result2.rows.item(i))

                  // const title = row.title
                  // const body = row.body;
                  // const status = row.notestatus;
                  // const device_time = row.note_date
                  // const type = row.note_type;

                  // const data2={
                  //   "email": email,
                  //   "uniqueId":uuid.v4(),
                  //   "notetitle": title,
                  //   "notebody": body,
                  //   "notestatus":status,
                  //   "notetype":type,
                  //   "notestime":device_time,
                  //   "sync_status":"true",
                  //   "device_id":DeviceInfo.getSystemVersion(),
                  //   "device_name":DeviceInfo.getModel(),
                  //   "app_version":VersionCheck.getCurrentVersion(),
                  // };
                  // console.log("data22hfhhf  ",data2);

                  // axios.post('https://backend3.rhapsodyofrealities.org/notes', data2)
                  // .then(function (response) {
                  //   console.log("Sync Response --->",response.data);
                      //                                 JSONObject object = jsonArray.getJSONObject(i);
  //                                 String msg = object.getString("msg");
  //                                 String success = object.getString("status");
  //                                 //todo : update sqlite table with result status
  //                                 if (success.equals("1")) {
  //                                     //Toast.makeText(getActivity(), msg, Toast.LENGTH_SHORT).show();
  //                                     Log.d("notes", msg);
  //                                 } else {
  //                                     //Toast.makeText(getActivity(), msg, Toast.LENGTH_SHORT).show();
  //                                     Log.d("notes", msg);
  //                                 }
  //                             }
  //                             //...successfully saved online...
  //                             Toast.makeText(getContext(), "Successfully Synced online", Toast.LENGTH_LONG).show();
  //                             showNotes();
  // //                            sync_all_notes();
  
  //                         } catch (JSONException e) {
  //                             Log.d("sync_single_note", "exception");
  //                             e.printStackTrace();
  //                             new MaterialAlertDialogBuilder(getActivity())
  //                                     .setCancelable(false)
  //                                     .setTitle("Internal Error")
  //                                     .setMessage("There was an issue. \n" +
  //                                             "\n" +
  //                                             e.toString())
  //                                     .setPositiveButton("Retry", new DialogInterface.OnClickListener() {
  //                                         @Override
  //                                         public void onClick(DialogInterface dialogInterface, int i) {
  //                                             sync_single_note(querytitle);
  //                                         }
  //                                     })
  //                                     .setNegativeButton("Cancel", null)
  //                                     .show();
  //                         }
                  // })
                  // .catch(function (error) {
                  //   console.log(error);
                  // });




                }
              },
              error => {
                console.log("Errorwytywwuw: ", error);
              }
            );
          });

    }




    return(
        <SafeAreaView style={styles.container}>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={{heigh:40, backgroundColor:'#D8A623', flexDirection:'row',marginBottom:10}}>
            <Text style={{fontWeight:'bold',color:'#ffffff',marginTop:10,marginLeft:10}}>{NoteItems.length} Notes</Text>
            <View style={{flexDirection:'row',marginLeft:'auto'}}>
              <TouchableOpacity style={{alignItems:'center',marginLeft:10}}>
                <MaterialCommunityIcons
                        name="refresh"
                        size={25}
                        color="#FFFFFF"
                    />
                <Text style={{color:'gray'}}>Refresh</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems:'center',marginLeft:10}}>
                  <MaterialCommunityIcons
                        name="cloud-outline"
                        size={25}
                        color="#FFFFFF"
                    />
                <Text style={{color:'gray'}}>Sync Notes</Text>
              </TouchableOpacity>
            </View>

          </View>
            

            {NoteItems.map((a,i) => {


              return (
                <View>
                  <TouchableOpacity style={{backgroundColor: "#eee", borderRadius: 5,
             overflow: "hidden",marginBottom:15,marginHorizontal: 8}} 
                   onPress={()=>{
                    db.transaction(tx => {
                      tx.executeSql(
                        'SELECT * FROM notes WHERE title LIKE ?',
                        ['%'+a.title+'%'], // Replace 'search_term' with the term you want to search for
                        (tx, results) => {
                          const len = results.rows.length;
                          for (let i = 0; i < len; i++) {
                            const row = results.rows.item(i);
                            // Do something with the retrieved data
                            console.log("Search Term yedhhdhhdhdhdhhd",row);
                            setEditTextID(row.title);
                            setEditText(row.title);
                            setEditBodyText(row.body);




                          }
                        },
                        error => {
                          console.log("Error: ", error);
                        }
                      );
                    });

                    bottomSheetRefEdit.current?.snapToIndex(1);
                   }}>
              <View>
                <View style={{flex:1,flexDirection:'row',
                              alignContent:'center',marginTop:15}}>
                    <MaterialCommunityIcons
                        style={{marginLeft:10,marginRight:0}}
                        name="receipt"
                        size={30}
                        color="#89CFF0"
                    />
                    <Text style={{fontWeight:'bold',fontSize:24}}>{a.notetitle}</Text>
                    <Text style={{color:'gray',marginLeft:10}}>{a.notetype}</Text>

                </View>
                <Text style={{color:'#89CFF0',marginLeft:10}}>{a.notestime}</Text>
                <Text 
                    style={{marginLeft:10,marginRight:10,flexWrap:'wrap',color:'gray',marginBottom:15}}
                    numberOfLines={3}>
                {a.notebody}

                </Text>
              </View>
            </TouchableOpacity>

                </View>

              )
                
            })}


          {notesVisible && (
            <View style={{
              position: "absolute",
              bottom: 16,
              top:Dimensions.get('window').height * 0.7,
              right: 8,
            }}>
              <TouchableOpacity style={{backgroundColor:'#D8A623',
              borderRadius:15,height:40,width:150}}
                onPress={()=>{
                  bottomSheetRef.current?.snapToIndex(1);
                  setNotesVisible(!notesVisible);
                }}>
                <View style={{flexDirection:'row'}}>
                  <MaterialCommunityIcons
                    style={{marginLeft:10,marginRight:10,marginTop:5}}
                    name="plus"
                    size={30}
                    color="white"
                  />
                  <Text
                    style={{fontWeight:'bold',
                    color:"#ffffff",marginTop:10}}>
                    ADD NOTE
                  </Text>
  
                </View>
                
  
              </TouchableOpacity>
  
            </View>

          )}

          {/* Edit Note toast */}
          <BottomSheet
            ref={bottomSheetRefEdit}
            index={-1}
            snapPoints={snapPoints}
            keyboardBehavior="fillParent"
            enablePanDownToClose
            onClose={() => {
              // setNotesVisible(true);
              bottomSheetRefEdit.current?.close()
              
            }}
          >
            <BottomSheetView style={styles.contentContainer}>
                <View style={{height:40,
                 alignContent:'center',justifyContent:'center'}}>
                  <View style={{flexDirection:'row',marginTop:2}}>
                    <TouchableOpacity onPress={()=>{
                      bottomSheetRefEdit.current?.close();
                    }} style={{marginLeft:10,marginRight:10}}>
                      <MaterialCommunityIcons  name='close' size={25} color='#D8A623'/>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 0.5,
                      }}>
                      <TextInput
                        style={{width:Dimensions.get('window').width * 0.6}}
                        onChangeText={onChangeText}
                        value={edittext}
                    />
                    </View>
                    <View style={{flexDirection:"row",marginLeft:'auto'}}>
                      <TouchableOpacity onPress={()=>{
                        //edittextid
                        insertNote();
                        
                      }} style={{marginLeft:5}}>
                      <MaterialCommunityIcons  name='content-save' size={25} color='#D8A623'/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{}} style={{marginLeft:10}}>
                      <MaterialCommunityIcons  name='share-variant' size={25} color='#D8A623'/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{}} style={{marginLeft:10}}>
                      <MaterialCommunityIcons  name='delete' size={25} color='#D8A623'/>
                      </TouchableOpacity>
                    </View>
                  </View> 
                </View>

                <TextInput
                        style={{
                            width:Dimensions.get('window').width,
                            borderBottomColor:'gray',
                            borderBottomWidth: 1,
                            height:Dimensions.get('window').width,

                      
                        }}
                        keyboardType='visible-password'
                        numberOfLines={50}
                        multiline={true}
                        underlineColorAndroid="gray"
                        value={edittextBody}
                        
                />

            </BottomSheetView>
          </BottomSheet>
          {/* end of edit note */}
          


          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            keyboardBehavior="fillParent"
            enablePanDownToClose
            onClose={() => {
              // setNotesVisible(true);
              bottomSheetRef.current?.close()
              
            }}
          >
            <BottomSheetView style={styles.contentContainer}>
                <View style={{height:40,
                 alignContent:'center',justifyContent:'center'}}>
                  <View style={{flexDirection:'row',marginTop:2}}>
                    <TouchableOpacity onPress={()=>{}} style={{marginLeft:10,marginRight:10}}>
                      <MaterialCommunityIcons  name='close' size={25} color='#D8A623'/>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 0.5,
                      }}>
                      <TextInput
                        style={{width:Dimensions.get('window').width * 0.6}}
                        onChangeText={onChangeText}
                        placeholder='Note Title'
                    />
                    </View>
                    <View style={{flexDirection:"row",marginLeft:'auto'}}>
                      <TouchableOpacity onPress={()=>{insertNote();}} style={{marginLeft:5}}>
                      <MaterialCommunityIcons  name='content-save' size={25} color='#D8A623'/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{}} style={{marginLeft:10}}>
                      <MaterialCommunityIcons  name='share-variant' size={25} color='#D8A623'/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{}} style={{marginLeft:10}}>
                      <MaterialCommunityIcons  name='delete' size={25} color='#D8A623'/>
                      </TouchableOpacity>
                    </View>
                  </View> 
                </View>

                <TextInput
                        style={{
                            width:Dimensions.get('window').width,
                            borderBottomColor:'gray',
                            borderBottomWidth: 1,
                            height:Dimensions.get('window').width,

                      
                        }}
                        keyboardType='visible-password'
                        numberOfLines={50}
                        multiline={true}
                        underlineColorAndroid="gray"
                        placeholder='Write your note'
                        
                />

                <SnackBar visible={toastVisible} textMessage={msg} 
                  actionHandler={()=>{setInternetCheck(false);}} actionText="OKAY"/>
            </BottomSheetView>
          </BottomSheet>

          {/* Toast.makeText(getContext(), "Notes Refreshed", Toast.LENGTH_SHORT).show(); */}
            

            <Modal
            animationType="slide"
            // transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View>
                 <View style={{height:40,marginTop:60,
                 alignContent:'center',justifyContent:'center'}}>
                  <View style={{flexDirection:'row',marginTop:2}}>
                    <TouchableOpacity onPress={()=>{}} style={{marginLeft:10,marginRight:10}}>
                      <MaterialCommunityIcons  name='close' size={25} color='gray'/>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 0.5,
                      }}>
                      <TextInput
                        style={{width:Dimensions.get('window').width * 0.6}}
                        onChangeText={onChangeText}
                        
                    />
                    </View>
                    <View style={{flexDirection:"row",marginLeft:'auto'}}>
                      <TouchableOpacity onPress={()=>{saveNote}} style={{marginLeft:5}}>
                      <MaterialCommunityIcons  name='content-save' size={25} color='gray'/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{}} style={{marginLeft:10}}>
                      <MaterialCommunityIcons  name='share-variant' size={25} color='gray'/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{}} style={{marginLeft:10}}>
                      <MaterialCommunityIcons  name='delete' size={25} color='gray'/>
                      </TouchableOpacity>
                    </View>
                  </View> 
                 </View>


            <TextInput placeholder=""
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    borderBottomColor: 'skyblue',//if we want only bottom line
                    borderBottomWidth: 1, // Add this to specify bottom border thickness &
                    textDecorationLine: 'underline',
                    //borderColor:"skyblue",//if we want to show our TextInput field inside the box
                    //borderWidth:2 //use this to show width of border boxes
                  }}
                  onChangeText={text => onChangeText(text)}
                  multiline={true}
                  numberOfLines={4}
                />

            </View>
      </Modal>   
        </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffffff',
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      marginHorizontal: 0,
    },
    contentContainer: {
      flex: 1,
    },
    text: {
      fontSize: 42,
      textDecorationLine: 'underline',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },

  });
  

export default AppNotes;