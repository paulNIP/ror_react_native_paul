import React, { useState, useEffect, useRef } from 'react';
import { Text, View,Image,ImageBackground,StyleSheet,TouchableOpacity,ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from 'react-native-paper';
import {Dimensions} from 'react-native';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneInput from "react-native-phone-number-input";

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const countries = [
  'Egypt',
  'Canada',
  'Australia',
  'Ireland',
  'Brazil',
  'England',
  'Dubai',
  'France',
  'Germany',
  'Saudi Arabia',
  'Argentina',
  'India',
];
const countriesWithFlags = [
  {title: 'Egypt', image: require('./Egypt.png')},
  {title: 'Canada', image: require('./Canada.png')},
  {title: 'Australia', image: require('./Australia.png')},
  {title: 'Ireland', image: require('./Ireland.png')},
  // {title: 'Brazil', image: require('./Brazil.png')},
  // {title: 'England', image: require('./England.jpg')},
  // {title: 'Dubai', image: require('./Dubai.png')},
];





const  RegistrationPage=({ route, navigation })=>  {

  const {email}='paulex.otim@outlook.com';
  const [text, setText] = React.useState('');

  const [country, setCountry] = React.useState();

  // const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);





  //function to register user
  const getUserInfo = () => {
     console.log("Navigation clicked");
      navigation.navigate('HomeApp');

  };

 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
      <ImageBackground source={require('../../assets/login_new_bg.png')} resizeMode="cover" style={styles.image}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{alignSelf:"flex-start",fontSize:28, marginTop:20,marginBottom:10,marginLeft:20}}>Sign Up</Text>
        <TextInput
          label="Full Names"
          onChangeText={newText => setNames(newText)}
          left={<TextInput.Icon icon="account" />}
          style={{width:Dimensions.get('window').width*0.9,marginBottom:10}}
        />

      <TextInput
        label="Username"
        onChangeText={newText => setUserName(newText)}
        left={<TextInput.Icon icon="account-circle" />}
        style={{width:Dimensions.get('window').width*0.9,marginBottom:10}}
      />

      <TextInput
        label="Email"
        value={email}
        left={<TextInput.Icon icon="email" />}
        style={{width:Dimensions.get('window').width*0.9,marginBottom:10}}
      />


          <SelectDropdown
            data={countriesWithFlags}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonStyle={styles.dropdown3BtnStyle}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                  {selectedItem ? (null) : (
                    <MaterialCommunityIcons style={{alignSelf:'center'}} name="google-maps" size={25} color="#36454F" />
                  )}
                  <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : 'Select zone (Optional)'}</Text>
                  <FontAwesome name="chevron-down" color={'#444'} size={18} />
                </View>
              );
            }}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View>
                  <Text style={{alignSelf:'center'}}>{item.title}</Text>
                </View>
              );
            }}
          />

<SelectDropdown
            data={countriesWithFlags}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonStyle={styles.dropdown3BtnStyle}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                  {selectedItem ? (null) : (
                    <MaterialCommunityIcons style={{alignSelf:'center'}} name="account-multiple" size={25} color="#36454F" />
                  )}
                  <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : 'Select group'}</Text>
                  <FontAwesome name="chevron-down" color={'#444'} size={18} />
                </View>
              );
            }}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View>
                  <Text style={{alignSelf:'center'}}>{item.title}</Text>
                </View>
              );
            }}
          />

          <SelectDropdown
            data={countriesWithFlags}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonStyle={styles.dropdown3BtnStyle}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                  {selectedItem ? (null) : (
                    // <Ionicons name="md-earth-sharp" color={'#444'} size={18} />
                    <MaterialCommunityIcons style={{alignSelf:'center'}} name="church" size={25} color="#36454F" />
                  )}
                  <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : 'Select church (Optional)'}</Text>
                  <FontAwesome name="chevron-down" color={'#444'} size={18} />
                </View>
              );
            }}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View>
                  <Text style={{alignSelf:'center'}}>{item.title}</Text>
                </View>
              );
            }}
          />

      <TextInput
        label="Password"
        onChangeText={newText => setNames(newText)}
        left={<TextInput.Icon icon="lock" />}
        style={{width:Dimensions.get('window').width*0.9,marginBottom:10}}
      />

        <TextInput
          label="Confirm Password"
          onChangeText={newText => setNames(newText)}
          left={<TextInput.Icon icon="lock" />}
          style={{width:Dimensions.get('window').width*0.9,marginBottom:10}}
        />

        <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="DM"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
            containerStyle={{
              width:Dimensions.get('window').width*0.9,marginBottom:10
            }}
            
          />
         

      <TouchableOpacity
        style={styles.button}
        onPress={() => getUserInfo()}
      >
        <Text style={{color:'white'}}>Register</Text>
      </TouchableOpacity>

      


      </View>
      </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  image2: {
    width: 96,
    height: 96,
    borderRadius: 24,
    marginBottom:20,
    marginTop:-20
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    height: 50,
    borderRadius:10,
    width: Dimensions.get('window').width*0.9,
    marginTop: 20,
    justifyContent: 'center',
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    width:60,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width:50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width:50, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },


  dropdown3BtnStyle: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 0,
    borderRadius: 4,
    borderColor: '#444',
    marginBottom:10
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
  

});

export default RegistrationPage;
