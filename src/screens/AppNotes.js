import { useState } from 'react';
import React from 'react';
import {
  StyleSheet,
  Text,Modal,
  SafeAreaView,View,
  ScrollView,
  StatusBar,TouchableOpacity,TextInput,Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import BottomSheet, { BottomSheetView,BottomSheetTextInput, } from '@gorhom/bottom-sheet';

const AppNotes =() =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [notesVisible, setNotesVisible] = useState(true);
    const [text, onChangeText] = useState('Note Title');

    const bottomSheetRef = React.useRef(null);
    const snapPoints = React.useMemo(() => ['50%', '75%', '100%'], []);

    return(
        <SafeAreaView style={styles.container}>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={{heigh:40, backgroundColor:'#D8A623', flexDirection:'row',marginBottom:10}}>
            <Text style={{fontWeight:'bold',color:'#ffffff',marginTop:10,marginLeft:10}}>3 Notes</Text>
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
            <TouchableOpacity style={{backgroundColor: "#eee", borderRadius: 10,
             overflow: "hidden",marginBottom:15,marginHorizontal: 8}}>
              <View>
                <View style={{flex:1,flexDirection:'row',
                              alignContent:'center',marginTop:15}}>
                    <MaterialCommunityIcons
                        style={{marginLeft:10,marginRight:0}}
                        name="receipt"
                        size={30}
                        color="#007CC0"
                    />
                    <Text style={{fontWeight:'bold',fontSize:24}}>Power of Prayer</Text>
                    <Text style={{color:'gray',marginLeft:10}}>book</Text>

                </View>
                <Text 
                    style={{marginLeft:10,marginRight:10,flexWrap:'wrap',color:'gray',marginBottom:15}}
                    numberOfLines={3}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.

                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor: "#eee", borderRadius: 10,
             overflow: "hidden",marginBottom:15}}>
              <View>
                <View style={{flex:1,flexDirection:'row',
                              alignContent:'center',marginTop:15}}>
                    <MaterialCommunityIcons
                        style={{marginLeft:10,marginRight:0}}
                        name="receipt"
                        size={30}
                        color="#007CC0"
                    />
                    <Text style={{fontWeight:'bold',fontSize:24}}>Power of Prayer</Text>
                    <Text style={{color:'gray',marginLeft:10}}>book</Text>

                </View>
                <Text 
                    style={{marginLeft:10,marginRight:10,flexWrap:'wrap',color:'#007CC0',marginBottom:5}}>
                   Friday 19 April
                </Text>
                <Text 
                    style={{marginLeft:10,marginRight:10,flexWrap:'wrap',color:'gray',marginBottom:15}}
                    numberOfLines={3}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.

                </Text>
              </View>
            </TouchableOpacity>


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
          


          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            keyboardBehavior="fillParent"
            enablePanDownToClose
            onClose={() => {
              setNotesVisible(true);
              
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
                        value={text}
                    />
                    </View>
                    <View style={{flexDirection:"row",marginLeft:'auto'}}>
                      <TouchableOpacity onPress={()=>{}} style={{marginLeft:5}}>
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
                        style={{width:Dimensions.get('window').width}}
                        value={text}
                        numberOfLines={50}
                        underlineColorAndroid="gray"
                        
                />
                



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
                        value={text}
                    />
                    </View>
                    <View style={{flexDirection:"row",marginLeft:'auto'}}>
                      <TouchableOpacity onPress={()=>{}} style={{marginLeft:5}}>
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


      {/* end of table of contents modal */} 
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