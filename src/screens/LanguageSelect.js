import React,{useState,useEffect} from 'react';
import {

  SafeAreaView,
  ScrollView,View
} from 'react-native';
import LanguageListItem from '../components/LanguageListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';


const languages = [
  {
    locale: 'en',
    name: 'English'
  },
  {
    locale: 'de',
    name: 'Deutsch',
    englishName: 'German'
  }
];

const LanguageSelect = () => {

 
  const [currentLocale, setCurrentLocalesetLanguage] = useState();
  

  useEffect(() => {

    const fetchData = async () => {
        let data = await AsyncStorage.getItem('locale');
        if(data==null){
          setCurrentLocalesetLanguage('en')
        }else{
          setCurrentLocalesetLanguage(data)
        }
        
    }
    fetchData();

}, []);

  return (
      <SafeAreaView>
       <ScrollView>
          <View style={{ marginTop: 15 }}>
            {
              languages.map((language) => (
                <LanguageListItem
                  key={language.locale}
                  isActive={currentLocale}
                  locale={language.locale}
                  name={language.name}
                  englishName={language.englishName}
                  onChangeLocale={(locale) => {console.log("Selected locale",locale)}}
                />
              ))
            }
          </View>

         
       </ScrollView>
     </SafeAreaView>
  );
};


export default LanguageSelect;






