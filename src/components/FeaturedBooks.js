import React, { useState, useEffect } from "react";
import { View, StyleSheet,Dimensions,Image ,TouchableOpacity,Text} from "react-native";
import ViewSlider from 'react-native-view-slider';
import { Linking } from 'react-native';
import { getFeaturedBooks } from "../service/storeService";
import { color } from "@rneui/base";

const { width, height } = Dimensions.get('window');




const FeaturedBooks = () => {

  const [ad, setAd] = useState([]);
 
  useEffect(() => {

      const fetchData = async () => {
          const data = await getFeaturedBooks();
          setAd(data)

      }
      fetchData();

  }, []);


  return (
    <View style={styles.container}>

<ViewSlider 
        renderSlides = {
          <>
            
            {ad.map((a,i) => {
              const link=a.img_link;
              return i === 0 ? 
              <TouchableOpacity onPress={()=>{ Linking.openURL(link)}}>
                <View key={a.id}>
                  <Image source={{uri: a.book_cover_img}} style={{height: height*0.25, width}}/>
                  <View style={{flexDirection:'row',marginLeft:10,marginTop:-170,marginBottom:10}}>
                            <Image source={{uri: a.book_cover_img}} style={{height: 160,
                                 width:width*0.25,borderRadius:10 }}/>
                            <View style={{marginLeft:10,width:width*0.60,marginTop:100}}>
                                <Text style={{color:'#FFFFFF',flexWrap:'wrap'}}>{a.book_title}</Text>
                                <Text style={{color:'#F9F6EE',flexWrap:'wrap'}}>{a.author_name}</Text>
                            </View>
                  </View>
                </View>
                </TouchableOpacity>
               : 
               
               <TouchableOpacity onPress={()=>{Linking.openURL(link)}}>
                <View key={a.id}>
                    
                        <Image source={{uri: a.book_cover_img}} style={{height: height*0.25, width}}/>
                        <View style={{flexDirection:'row',marginLeft:10,marginTop:-170,marginBottom:10}}>
                            <Image source={{uri: a.book_cover_img}} style={{height: 160, width:width*0.25
                                ,borderRadius:10}}/>
                            <View style={{marginLeft:10,marginTop:100,width:width*0.60}}>
                                <Text style={{color:'#FFFFFF'}}>{a.book_title}</Text>
                                <Text style={{color:'#F9F6EE'}}>{a.author_name}</Text>
                            </View>
                        </View>
                </View>
                   
              </TouchableOpacity>
            })}
         </>
      }
      style={styles.slider}     //Main slider container style
      height = {height*0.25}    //Height of your slider
      slideCount = {ad.length}    //How many views you are adding to slide
      dots = {false}     // Pagination dots visibility true for visibile 
      // dotActiveColor = 'red'     //Pagination dot active color
      // dotInactiveColor = 'gray'    // Pagination do inactive color
      // dotsContainerStyle={styles.dotContainer}     // Container style of the pagination dots
      autoSlide = {true}    //The views will slide automatically
      slideInterval = {5000}    //In Miliseconds
     />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        mrgingBottom:20,
        marginHorizontal:10,
        marginLeft:20,
        marginRight:20
    },

    viewBox: {
      paddingHorizontal: 20,
      justifyContent: 'center',
      width: width,
      // padding: 10,
      borderRadius: 20,
       overflow: "hidden",
      alignItems: 'center',
      height: 'auto'
  },
  slider: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'pink',
      borderRadius: 20,
  },
  dotContainer: {
    backgroundColor: 'transparent'
  }
});

export default FeaturedBooks;
