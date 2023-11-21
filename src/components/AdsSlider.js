import React, { useState, useEffect } from "react";
import { View, StyleSheet,Dimensions,Image ,TouchableOpacity,Text} from "react-native";
import { rorAds } from "../service/rorAds";
import ViewSlider from 'react-native-view-slider';
import { Linking } from 'react-native';

const { width, height } = Dimensions.get('window');




const AdsSlider = () => {

  const [ad, setAd] = useState([]);
 
  useEffect(() => {

      const fetchData = async () => {
          const data = await rorAds()
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
                <View key={a.ad_name}>
                  <Image source={{uri: a.img_src}} style={{height: 200, width,borderRadius: 20}}/>
                </View>
                </TouchableOpacity>
               : 
               <TouchableOpacity onPress={()=>{Linking.openURL(link)}}>
              <View key={a.ad_name}>
                <Image source={{uri: a.img_src}} style={{height: 200, width,borderRadius: 20}}/>
              </View>
              </TouchableOpacity>
            })}
         </>
      }
      style={styles.slider}     //Main slider container style
      height = {200}    //Height of your slider
      slideCount = {5}    //How many views you are adding to slide
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
        marginTop:20,
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

export default AdsSlider;
