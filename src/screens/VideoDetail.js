import React, { useEffect, useState ,useRef} from 'react';
import { Icon,BottomSheet } from '@rneui/themed';
import {Dimensions,FlatList} from 'react-native';
import {Overlay } from '@rneui/themed';
import { Button } from '@rneui/themed';
import { TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';



// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LogBox,ScrollView,Share,Modal
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import RelatedScreen from './RelatedScreen';
import CommentScreen from './CommentScreen';
import SelectDropdown from 'react-native-select-dropdown';
import { getRelatedTVProgramme, getTVProgramme } from '../service/liveTvService';

const windowHeight = Dimensions.get('window').height*0.6;
const windowWidth = Dimensions.get('window').width;



const VideoDetail= ({ route, navigation }) => {

    const { videoid } = route.params;
    const [visible, setVisible] = useState(false);
    const [visible00, setVisible00] = useState(false);
    const [isVisible0, setIsVisible0] = useState(false);
    const [isVisible00, setIsVisible00] = useState(false);

    const [index, setIndex] = useState(1);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const toggleOverlay = () => {
        setVisible(!visible);
      };

      const toggleOverlay2 = () => {
        setVisible00(!visible00);
      };

    const [tvProgram, setTvProgram] = useState([]);


    useEffect(() => {
  
        const fetchData = async () => {
            const data = await getTVProgramme(videoid);
            setTvProgram(data);

        }
        fetchData();
  
    }, []);





    const RenderElement = () => {
        //You can add N number of Views here in if-else condition
        if (index === 1) {
        //Return the FirstScreen as a child to set in Parent View
        return <RelatedScreen relatedVideos = {tvProgram} />;
        } else if (index === 2) {
        //Return the SecondScreen as a child to set in Parent View
        return <CommentScreen />;
        }
    };

    const [text, setText] = React.useState("");

    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    const url = 'https://play.google.com/store/search?q=rhapsody+of+realities+app&c=apps&hl=en&gl=US';
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              ('Rhapsody of Realities Official'+ '\n'+'Read, watch & Listen to Rhapsody of Realities all within the new mobile app'+''+ url )
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

      const [phoneNumber, setphoneNumber] = useState('');
      const phoneInput = useRef(null);
      const buttonPress = () => {
        Alert.alert(phoneNumber);
      };

      


      const renderSelectedVideo = ({ item }) => {

        const vid = item.url;
    
        
        return (
          <View>
            <View>
        {/* Video Component */}

        <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: {vid},
          }}
          useNativeControls
          // resizeMode={ResizeMode.COVER}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={{flex:1,justifyContent:'space-between'}}>
            
                <Text style={{marginLeft:10,fontWeight:'bold'}}>{item.title}</Text>
                <Text style={{marginLeft:10,color:'#999999'}}>{item.description}</Text>
            
            </View>
        </View>

        <View style={{  borderRadius: 5, overflow: "hidden",
        flexDirection:'row',flexWrap:'space-around',justifyContent:'space-evenly' }}>
          <TouchableOpacity onPress={toggleOverlay}>
            <Icon style={{ alignSelf:'center'}} name="badge-account" type="material-community" color="grey" />
            <Text>volunteer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleOverlay2}>
            <Icon style={{ alignSelf:'center'}} name="plus-circle" type="material-community" color="grey" />
            <Text>Pledge</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsVisible0(true)}>
            <Icon style={{ alignSelf:'center'}} name="credit-card" type="material-community" color="grey" />
            <Text>give</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onShare }>
            <Icon style={{ alignSelf:'center'}} name="share" type="material-community" color="grey" />
            <Text>share</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          {/*To set the FirstScreen*/}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setIndex(1)}>
            <Text style={{color: '#ffffff'}}>RELATED</Text>
          </TouchableOpacity>
          {/*To set the SecondScreen*/}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setIndex(2)}>
            <Text style={{color: '#ffffff'}}>COMMENTS</Text>
          </TouchableOpacity>
        </View>
        {/*View to hold the child screens 
        which can be changed on the click of a button*/}
        <View style={{backgroundColor: '#ffffff'}}>
          <RenderElement />
        </View>
      </View>



       </View>

       <BottomSheet modalProps={{}} isVisible={isVisible0}>

        <TouchableOpacity onPress={() => setIsVisible0(false)}>
       
        <View style={{backgroundColor:'white'}}>

          <View style={{marginTop:5,marginLeft:20,marginRight:20}}>

            <Text style={{width:100, marginTop:5, marginBottom:5}}>Give ...</Text>

            <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                />

            <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                />

            <TextInput
                label="Enter amount to give in USD"
                value={text}
                onChangeText={text => setText(text)}
                style={{marginTop:5, marginBottom:5}}
                />

            <Button
              title="Give Now"
              onPress={() => {}}
              style={{marginTop:5, marginBottom:5}}
            />

            </View>

            <TouchableOpacity>
                <Text style={{color:"#eee",alignSelf:'center'}}>Use other payment means</Text>
            </TouchableOpacity>

            <ScrollView>

            <View style={{marginLeft:20,marginRight:20,marginBottom:10,borderRadius:5,marginTop:10,backgroundColor:'#E5E4E2'}}>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Country</Text>
                    <Text style={{color:'grey'}}>NIGERIA</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Account Name</Text>
                    <Text style={{color:'grey'}}>RHAPSODY OF REALITIES MISSION</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Bank Name</Text>
                    <Text style={{color:'grey'}}>GT BANK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:4}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>0173233796</Text>
                </View>
            </View>

            <View style={{marginLeft:20,marginRight:20,marginBottom:10,borderRadius:5,marginTop:10,backgroundColor:'#E5E4E2'}}>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Country</Text>
                    <Text style={{color:'grey'}}>UK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Account Name</Text>
                    <Text style={{color:'grey'}}>BELIEVERS LOVEWORLD</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Bank Name</Text>
                    <Text style={{color:'grey'}}>BARCLAYS BANK UK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:4}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:4}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:4}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
            </View>

            <View style={{marginLeft:20,marginRight:20,marginBottom:10,borderRadius:5,marginTop:5,backgroundColor:'#E5E4E2'}}>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Country</Text>
                    <Text style={{color:'grey'}}>UK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account Name</Text>
                    <Text style={{color:'grey'}}>BELIEVERS LOVEWORLD</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Bank Name</Text>
                    <Text style={{color:'grey'}}>BARCLAYS BANK UK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>3347850</Text>
                </View>
            </View>

            <View style={{marginLeft:20,marginRight:20,marginBottom:10,borderRadius:5,marginTop:5,backgroundColor:'#E5E4E2'}}>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Country</Text>
                    <Text style={{color:'grey'}}>U.S.A</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account Name</Text>
                    <Text style={{color:'grey'}}>GLOBAL DISTRIBUTORS NETWORK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Bank Name</Text>
                    <Text style={{color:'grey'}}>US BANK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>130124243531</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Branch Code.</Text>
                    <Text style={{color:'grey'}}>0412025825</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Swift Code.</Text>
                    <Text style={{color:'grey'}}>USBKUS441MT</Text>
                </View>
            </View>

            <View style={{marginLeft:20,marginRight:20,marginBottom:10,borderRadius:5,marginTop:5,backgroundColor:'#E5E4E2'}}>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:2}}>
                    <Text style={{width:100}}>Country</Text>
                    <Text style={{color:'grey'}}>SOUTH AFRICA</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account Name</Text>
                    <Text style={{color:'grey'}}>LOVEWORLD PUBLISHING PTY</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Bank Name</Text>
                    <Text style={{color:'grey'}}>STANDARD BANK</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Account No.</Text>
                    <Text style={{color:'grey'}}>420283706</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Branch Code.</Text>
                    <Text style={{color:'grey'}}>018005</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10,marginTop:2,marginBottom:2}}>
                    <Text style={{width:100}}>Swift Code.</Text>
                    <Text style={{color:'grey'}}>SBZAZAJJ</Text>
                </View>
            </View>
            </ScrollView>

            

            
            
        
        </View>
        </TouchableOpacity>
        

       </BottomSheet>

       <Overlay ModalComponent={Modal} fullScreen={false} 
              isVisible={visible} 
              onBackdropPress={toggleOverlay} overlayStyle={{width:windowWidth,height:windowHeight}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#778899'}}>
                  
                    <Text style={{alignSelf:'center',marginTop:10,marginBottom:10}}>
                        Join a volunteer Network
                    </Text>
                </View>
                <Text style={{marginTop:10,marginBottom:10}}>
                        CHOOSE VOLUNTEER OPTIONS BELOW:
                    </Text>
                    <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                />

                    <Text style={{marginTop:10,marginBottom:10}}>
                        PHONE NUMBER:
                    </Text>

                    {/* <TextInput
                    label="Phone number ??"
                    value={text}
                    onChangeText={text => setText(text)}
                    style={{marginTop:10,marginBottom:10}}
                  /> */}

                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="IN"
                  layout="first"
                  withShadow
                  autoFocus
                  containerStyle={styles.phoneContainer}
                  textContainerStyle={styles.textInput}
                  onChangeFormattedText={text => {
                    setphoneNumber(text);
                  }}
                />
                {/* <Pressable style={styles.button} onPress={() => buttonPress()}>
                  <Text style={styles.continueText}>Get Phone Number</Text>
                </Pressable> */}


                  <TextInput
                        label="City"
                        value={text}
                        onChangeText={text => setText(text)}
                        style={{marginTop:10,marginBottom:10}}
                      />



                    <Text style={{marginTop:10,marginBottom:10}}>
                        SELECT ZONE:
                    </Text>
                    <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                />

                <Button
                  onPress={()=>{}}
                  title="SUBMIT"
                  color="#F9A825"
                  accessibilityLabel="Learn more about this purple button"
                  style={{marginTop:10,marginBottom:10}}
                />

                </ScrollView>


        </Overlay>

        <Overlay ModalComponent={Modal} fullScreen={false} 
              isVisible={visible00} 
              onBackdropPress={toggleOverlay2} overlayStyle={{width:windowWidth,height:windowHeight}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#007CC0'}}>
                  
                    <Text style={{alignSelf:'center',marginTop:10,marginBottom:10}}>
                        Pledge Form
                    </Text>
                </View>
                <Text style={{marginTop:10,marginBottom:10}}>
                        CHOOSE PLEDGE OPTION BELOW:
                    </Text>
                    <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                />

              <TextInput
                    label="Type pledege amount"
                    value={text}
                    onChangeText={text => setText(text)}
                    style={{marginTop:10,marginBottom:10}}
                  />

                <Text style={{marginTop:10,marginBottom:10}}>
                        Choose currency below:
                    </Text>
                    <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                />

                    <Text style={{marginTop:10,marginBottom:10}}>
                        PHONE NUMBER:
                    </Text>

                    {/* <TextInput
                    label="Phone number ??"
                    value={text}
                    onChangeText={text => setText(text)}
                    style={{marginTop:10,marginBottom:10}}
                  /> */}

                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="IN"
                  layout="first"
                  withShadow
                  autoFocus
                  containerStyle={styles.phoneContainer}
                  textContainerStyle={styles.textInput}
                  onChangeFormattedText={text => {
                    setphoneNumber(text);
                  }}
                />
                {/* <Pressable style={styles.button} onPress={() => buttonPress()}>
                  <Text style={styles.continueText}>Get Phone Number</Text>
                </Pressable> */}


                  <TextInput
                        label="City"
                        value={text}
                        onChangeText={text => setText(text)}
                        style={{marginTop:10,marginBottom:10}}
                      />



                    <Text style={{marginTop:10,marginBottom:10}}>
                        SELECT ZONE:
                    </Text>
                    <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                />

                <Button
                  onPress={()=>{}}
                  title="SUBMIT PLEDEGE"
                  color="#F9A825"
                  accessibilityLabel="Learn more about this purple button"
                  style={{marginTop:10,marginBottom:10}}
                />

                </ScrollView>


        </Overlay>

          </View>
        );
      };


  return (

    <SafeAreaView style={{flex: 1}}>
      <FlatList data={tvProgram} renderItem={renderSelectedVideo}  />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
    },
    paragraphStyle: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonStyle: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#808080',
      padding: 10,
      margin: 2,
    },
    dropdown3BtnStyle: {
      width: '100%',
      paddingHorizontal: 0,
      borderWidth: 0,
      borderRadius: 4,
      marginTop:5,
      marginBottom:5,
      borderColor: '#444',
    },

    video: {
        alignSelf: 'center',
        width: windowWidth,
        height: 200,
        marginBottom:10
      },
    buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    },
    phoneContainer: {
      width: '100%',
      height: 50,
    },
    button: {
      marginTop: 30,
      width: '75%',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'green',
    },
    textInput: {
      paddingVertical: 0,
    },


  });

export default VideoDetail;