import React,{useEffect,useState} from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';




const LanguageListItem = ({key,isActive,locale,name,englishName,onChangeLocale}) => {

  const [language, setLanguage] = useState();
  const navigation = useNavigation();
  

  useEffect(() => {

    const fetchData = async () => {
        let data = await AsyncStorage.getItem('language');
            if(data==null){

            }else{
              setLanguage(data)
            }
            
        }
        fetchData();

    }, []);

    const handleLocaleChange =() => {
        Alert.alert(
          'Language', 'Change Language', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
              setLocale();
              navigation.navigate("Welcome");
            }},
          ]
        )
      }


      const setLocale = async () => {

        try {
            //Set locale
            await AsyncStorage.setItem('locale',locale);
            await AsyncStorage.setItem('language',name);
            return true;
        }
        catch(exception) {
            return false;
        }

        

          
      };

 


  return (
    <TouchableOpacity
    style={styles.listItem}
    onPress={handleLocaleChange}
  >
    <View style={styles.textWrapper}>
      <Text style={[
        styles.title, (isActive && styles.active)
      ]}>
        {name}
      </Text>
      {
        englishName &&
          <Text style={styles.subtitle}>{englishName}</Text>
      }
    </View>
    {
      (name ===language) &&
      (
        <Icon
          style={styles.active}
          name="ios-checkmark-circle-outline"
          size={30}
        />
      )
    }
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      alignItems: 'center',
      padding: 10
    },
    textWrapper: {
      width: '90%',
      marginLeft: 10
    },
    title: {
      fontSize: 18,
      color: '#434343'
    },
    subtitle: {
      color: '#AAAAAA'
    },
    active: {
      color: '#03a87c'
    }
  });


export default LanguageListItem;






