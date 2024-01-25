import React,{useState,useEffect} from "react";
import { getAllTranslatedBooks, getTranslatedBooks } from "../service/storeService";
import { ScrollView,Text,View,Dimensions,
    TouchableOpacity,Image,FlatList,Modal,TextInput } from "react-native";
import { Divider,ListItem} from '@rneui/themed';
import { Button } from '@rneui/themed';
import {Overlay } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";




const TranslatedBooks = () => {

    const navigation =useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    const [visible, setVisible] = useState(false);

     
    const [translatedTitle, setTranslatedTitle] = useState();
    const [translatedDescription, setTranslatedDescription] = useState();
    const [translatedBooks, setTranslatedBooks] = useState();
    const [allTranslatedLanguages, setAllTranslatedLanguages] = useState();
    const [search, setSearch] = useState('');

    useEffect(() => {
  
      const fetchData = async () => {
          const translated = await getTranslatedBooks();
          setTranslatedBooks(translated[0].languages);
          setTranslatedTitle(translated[0].category_name);
          setTranslatedDescription(translated[0].category_description);
          const translatedLangs = await getAllTranslatedBooks();
          setAllTranslatedLanguages(translatedLangs);
  
      }
      fetchData();
  
    }, []);

    // console.log("Books Translated",translatedBooks);
    // console.log("Books Title",translatedTitle);
    // console.log("Books Description",translatedDescription);


    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const renderItem = ({ item }) => (
        <View>
           <Text>{item.lang}</Text>
        </View>    
    );
    const goToTranslatedBooks=(language)=>{
        navigation.navigate('LanguageBooks',{lang:language});

    }
        

    const renderBooks = ({ item }) => {
        
        const imgr = item.image;
        const language = item.lang;

        return (
            <View style={{marginEnd:10,width:windowWidth*0.3,
                borderTopRightRadius:5,
                borderBottomLeftRadius:5,
                borderTopLeftRadius:5,
                borderBottomRightRadius:5}}>
                <TouchableOpacity onPress={()=>{goToTranslatedBooks(language);}}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
                    <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                        <Image
                        source={{uri:imgr,
                        cache: 'force-cache'}}
                        style={{
                            height: 150,
                            width: windowWidth*0.3
                        }}
                        />
                    <View style={{height:50,flex:1}}>
                        <Text style={{  marginLeft:10,marginTop:10,
                            flexWrap: 'wrap' }}
                            >{item.lang}</Text>
                    </View>
                    </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
      };

    return (
        <View >
            <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
                <Divider orientation="vertical" width={5} />
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{marginBottom:15,alignItems:'flex-start',width:windowWidth*0.65}}>
                    <Text style={{marginLeft:10,fontWeight:'bold'}}>{translatedTitle}</Text>
                    <Text style={{marginLeft:10,color:'#999999',flexWrap:"wrap"}}>{translatedDescription}</Text>
                </View>
                <View style={{marginBottom:15,alignItems:'flex-end',marginLeft:'auto',width:windowWidth*0.3}}>
                    <Button title="VIEW ALL" type="outline"  color="warning" onPress={toggleOverlay}/>
                </View>
                </View>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  
             showsVerticalScrollIndicator={false} style={{marginHorizontal:10}} >
                 <FlatList data={translatedBooks} renderItem={renderBooks} horizontal={true}
                   />

            <Overlay ModalComponent={Modal} fullScreen={false}
            isVisible={visible} 
            onBackdropPress={toggleOverlay} overlayStyle={{width:windowWidth*0.8,height:windowHeight*0.8}}>
                <Text style={{alignSelf:'center',marginTop:20,fontWeight:'bold'}}>
                        Choose Language
                </Text>
            </Overlay> 


            </ScrollView>  

        </View>



        
    );
}

export default TranslatedBooks;