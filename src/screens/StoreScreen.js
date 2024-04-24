import React  , { useEffect, useState } from 'react';
import {View, Text,SafeAreaView,ScrollView,StyleSheet, StatusBar,TouchableOpacity,Image,FlatList,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider} from '@rneui/themed';
import { Button } from '@rneui/themed';



import { getBooks,getTranslatedBooks
  //  getCategories, getChildrenDevotional, getChistianLiving,
  //  getDivineHealing, getHolySpirit, getPopularBooks, getPrayer, getProsperity, getSoulWining,
  //   getTeenDevotional, getTranslatedBooks
  
  } from "../service/storeService";
import {Dimensions} from 'react-native';
import TranslatedBooks from '../components/TranslatedBooks';
import FeaturedBooks from '../components/FeaturedBooks';
import KidsBooks from '../components/KidsBooks';
import BookCategories from '../components/BookCategories';
import EarlyReaders from '../components/EarlyReaders';
import DailyDevotionalBooks from '../components/DailyDevotionalBooks';
import Teevo from '../components/Teevo';
import Prayer from '../components/Prayer';
import FaithProsperity from '../components/FaithProsperity';
import HolySpirit from '../components/HolySpirit';
import DivineHealing from '../components/DivineHealing';
import SoulWining from '../components/SoulWining';
import ChristianLiving from '../components/ChristianLiving';
import ChildrenBooks from '../components/ChildrenBooks';
import Avanzini from '../components/Avanzini';
import Strings from '../constants/Strings';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;


const StoreScreen = ({ navigation }) => {


  const [books, setBooks] = useState([]);
  const [translatedBooks, setTranslatedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allbooks, setAllBooks] = useState();

  useEffect(() => {
    // const getAllBooks = async () => {
    //   try {
    //     const response = await axios.get(Strings.BOOKS_URL+'/fetch').then((res) => {
    //       setIsLoading(false);
    //       setAllBooks(response.data.EBOOK_APP);
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     });
    //   }catch(e){
    //     console.log(e);
    //     }
    // }

    const fetchData = async () => {
        const data = await getBooks();
        setBooks(data);
        const translated = await getTranslatedBooks();
        setTranslatedBooks(translated.languages);
        setIsLoading(false);
    }

    fetchData();
    // getAllBooks();


  }, []);




  const renderCategories = ({ item }) => {

    const imgr = item.category_image;

    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Book List',{cat_id:item.cid})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />


              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.category_name}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  [ {item.total_books} ] item(s) {item.cat_id}
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderProsperity = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderHolySpirit = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderDivineHealing = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />
              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderSoulWining = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderChildrenDevtional = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderChristianLiving = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderPrayer = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderTeenDevotional = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderPopularBooks = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />


              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderTranslatedBooks = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />


              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

      {/* {isLoading? (
      <View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }} >
       
        <ActivityIndicator 
        style={{justifyContent: 'center',
        alignItems: 'center'}}
            color="gray"
          />
          
      </View>
      </View>
      ):( */}
      <View>
        <FeaturedBooks/>
            <BookCategories/>

            <KidsBooks/>

            <EarlyReaders/>

            <DailyDevotionalBooks/>

            <Teevo/>

            <Prayer/>

            <FaithProsperity/>

            <HolySpirit/>

            <DivineHealing/>

            <SoulWining/>

            <ChristianLiving/>

            <ChildrenBooks/>

            <Avanzini/>

            <TranslatedBooks/>

      </View>
      
      {/* // )} */}
        
        

        
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor :'#ffffff'
  },
  scrollView: {

  }

});


export default StoreScreen;