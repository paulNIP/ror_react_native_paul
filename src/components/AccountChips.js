import React ,{useEffect,useState} from 'react';
import { View, ScrollView, StyleSheet,
  TouchableOpacity,Text,Modal,FlatList,Dimensions,TextInput } from 'react-native';
import { Chip, withTheme, lightColors } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage";


import { useNavigation } from '@react-navigation/native';
import { getProfile } from '../service/authService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getLanguages } from '../service/devotionalService';
import { Divider,ListItem} from '@rneui/themed';
import {Overlay } from '@rneui/themed';

const AccountChips = () => {
  const navigation = useNavigation();
  const walletClickedHandler = () => {
    navigation.navigate('Wallet');
  };

  const subscriptionClickedHandler = () => {
    navigation.navigate('Subscription');
  };

  const toggleOverlay = () => {
    setVisible(!visible);
};

  const [profile, setProfile] = useState();
  const [status, setStatus] = useState();
  const [language, setLanguage] = useState();
  const [allTranslatedLanguages, setAllTranslatedLanguages] = useState();
  const [searchText, setSearchText] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;


  const [visible, setVisible] = useState(false);




  useEffect(() => {

      const fetchData = async () => {
        const lang =await getLanguages();
        setAllTranslatedLanguages(lang.languages)
          const email= await AsyncStorage.getItem('email');
          if(email==null){

          }else{
            const data = await getProfile(email);
            setProfile(data);
            setStatus(data.subscription.status);

          }

          let data = await AsyncStorage.getItem('language');
          if(data==null){
            setLanguage('English')
          }else{
            setLanguage(data)
          }



      }
      fetchData();

    }, []);

    const searchFunction = (text) => {
      setSearchText(text);
      text = text.toLowerCase();
      if (text === "") {
          setAllTranslatedLanguages(allTranslatedLanguages);
      }
      else {
        // console.log("MMIIIII",text  );
        // let filteredLanguages = allTranslatedLanguages.filter(allTranslatedLanguage => (allTranslatedLanguage.toLowerCase().startsWith(text)))
        // setAllTranslatedLanguages(filteredLanguages);
      }
    }

    const setPrefferdLanguage =async (lang) => {
      await AsyncStorage.setItem('language',lang)
      setVisible(!visible);
    }
    




return (
  <>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View style={styles.contentView}>
      
          <TouchableOpacity style={styles.roundButton}
            onPress={()=>{
              if(status==='active'){
                navigation.navigate('My Wallet');
              }else if(status!=='active' && status !=null){
                navigation.navigate('My Wallet');
              }else{
                navigation.navigate('Login');
              }
            }}
            >
            <Text>Check Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundButton}
            onPress={()=>{
              if(status==='active'){
                navigation.navigate('Subscription');

              }else if(status!=='active' && status !=null){
                navigation.navigate('Subscription');

              }else{
                navigation.navigate('Subscription');

              }
            }}
            >
            <Text>Upgrade Subscription</Text>
          </TouchableOpacity>

            <TouchableOpacity style={styles.roundButton}
            onPress={()=>{
              setVisible(true);

            }}
            >
            <View style={{flexDirection:"row"}}>
                {/* <FontAwesome name="globe" size={20} color="#900" /> */}
                <MaterialCommunityIcons  size={20} name='earth' color='gray'/>
                <Text> Language - {language}</Text>
            </View>
          </TouchableOpacity>


      </View>

      <Overlay ModalComponent={Modal} fullScreen={false}
            isVisible={visible} 
            onBackdropPress={toggleOverlay} overlayStyle={{width:windowWidth*0.8,height:windowHeight*0.8}}>
                <Text style={{alignSelf:'center',marginTop:20,fontWeight:'bold'}}>
                        Choose Language
                </Text>
                <TextInput 
                placeholderTextColor="black"
                placeholder="Search available languages"
                value={searchText}
                style={{height:40}}
                onChangeText={text => searchFunction(text)}
                />
                <FlatList   
                data={allTranslatedLanguages} 
                extraData={ allTranslatedLanguages }
                showsVerticalScrollIndicator={ false }
                keyExtractor={(item) => item} 
                 renderItem={({item}) =>   
                 <ListItem bottomDivider onPress={()=>{setPrefferdLanguage(item)}}>
                 <ListItem.Content>
                   <ListItem.Title>{item} </ListItem.Title>
                 </ListItem.Content>
               </ListItem>} />
            </Overlay> 
      </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
    contentView: {
      flex: 1,
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'center',
      // justifyContent: 'space-between',
      justifyContent: 'center',
      marginVertical: 15,
      padding:5,
      alignContent:"center"


    },
    roundButton: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      marginEnd:5,
      borderRadius: 20,
      backgroundColor: '#D8D9DA',
    },
});

export default AccountChips;