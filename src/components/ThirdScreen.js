
// import React in our code
import React, {useState,useEffect} from 'react';

// import all the components we are going to use
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Icon } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getProfile } from '../service/authService';

const ThirdScreen = () => {

  const [profile, setProfile] = useState([]);


  useEffect(() => {

    const fetchData = async () => {
        const data = await getProfile()
        setProfile(data)

    }
    fetchData();

  }, []);


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);

    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  return (
    <View style={styles.container}>
    <Text style={{marginLeft:10,marginTop:30,alignSelf:'center'}}>Current zone</Text>
    <Text style={{marginLeft:10,alignSelf:'center',color:'#89CFF0'}}>Current zone</Text>
   

    <View style={{flexDirection:'row'}}>
      {/* <Text style={{color:'grey', marginStart:10}}>SUBSCRIPTION STATUS</Text> */}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{marginBottom:10,marginTop:10}}
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
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                />
      </View>

  <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#F9A825',padding:10,marginBottom:10}}>
      <View style={{flexDirection:'row',backgroundColor:'F9A825'}}>
      <Text style={{color:'grey',marginTop:3}}>UPDATE ZONE</Text>
      </View>
    </TouchableOpacity>


  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      justifyContent: 'center',
      borderRadius:15,
      marginTop:5
    },
    paragraphStyle: {
      margin: 24,
      marginTop: 0,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    logoStyle: {
      height: 100,
      width: 100,
      alignSelf:'center',
      marginTop:-120
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
  });

export default ThirdScreen;