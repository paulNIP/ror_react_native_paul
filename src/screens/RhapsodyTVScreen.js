
import React , { useEffect, useState } from 'react';
import {Button, View, Text, SafeAreaView,StyleSheet,ScrollView,Image,FlatList,TouchableOpacity } from 'react-native';
import { rhapsodyTv } from '../service/liveTvService';
import { featuredTv } from '../service/liveTvService';

import {Dimensions} from 'react-native';


const RhapsodyTVScreen = ({navigation}) => {

  const [tvPrograms, setTvPrograms] = useState([]);
  const [featured, setFeaturedTV] = useState([]);
 
  useEffect(() => {

      const fetchData = async () => {
          const data = await rhapsodyTv();
          const data2 = await featuredTv();
          setTvPrograms(data);
          setFeaturedTV(data2);
      }
      fetchData();

  }, []);

  
 


  const renderRhapsodyTravels = ({ item }) => {

    const img = item.thumbnail;
    
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate('VideoDetail',{videoid:item.videoid})}}> 
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
        <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
            <Image
              source={{uri:img}}
              style={{
                height: 100,
                width: 150
              }}
              // resizeMode="contain"
            />
          <View style={{ padding: 10, width: 150, height:90 }}>
            <Text style={{flexWrap: 'wrap',alignSelf:'center'}}>{item.title}</Text>
          </View>
        </View>
        </View>

      </TouchableOpacity>
    );
  };



  return (
    <SafeAreaView>
      <ScrollView>

      <TouchableOpacity  onPress={()=>{navigation.navigate('VideoDetail',{videoid:featured.videoid})}}> 
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
        <View style={{ backgroundColor: "#eee", borderRadius: 0, overflow: "hidden" }}>
            <Image
              source={{uri:featured.thumbnail}}
              style={{
                height: 200,
                width: Dimensions.get('window').width
              }}
              // resizeMode="contain"
            />
          <View style={{ padding: 10}}>
            <Text style={{flexWrap: 'wrap'}}>{featured.title}</Text>
            <Text style={{flexWrap: 'wrap'}}>{featured.description}</Text>
          </View>
        </View>
        </View>

      </TouchableOpacity>


        <View style={styles.container}>
          <View style={{marginTop:5,marginBottom:5}}>
            <Text style={{color:'#F9A825',fontSize:16}}>RHAPSODY TRAVELS</Text>
            <Text style={{color:'#708090'}}>Journey with us to the Nations, cities and islands</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
                <FlatList data={tvPrograms.rhapsody_travels} renderItem={renderRhapsodyTravels} numColumns={700}  />
          </ScrollView>


          <View style={{marginTop:5,marginBottom:5}}>
            <Text style={{color:'#F9A825',fontSize:16}}>RHAPSODY AND MY CITY</Text>
            <Text style={{color:'#708090'}}>Journey with Rhapsody of Realities  into communities and cities of the world</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
                <FlatList data={tvPrograms.rhapsody_cities} renderItem={renderRhapsodyTravels} numColumns={700}  />
          </ScrollView>

          <View style={{marginTop:5,marginBottom:5}}>
            <Text style={{color:'#F9A825',fontSize:16}}>THE DAY GOD SPOKE MY LANGUAGE</Text>
            <Text style={{color:'#708090'}}>Testimonies of users of Rhapsody translations</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
                <FlatList data={tvPrograms.rhapsody_languages} renderItem={renderRhapsodyTravels} numColumns={700}  />
          </ScrollView>

          <View style={{marginTop:5,marginBottom:5}}>
            <Text style={{color:'#F9A825',fontSize:16}}>RHAPSODY STORIES</Text>
            <Text style={{color:'#708090'}}>Testimonies of Rhapsody users and how they applied God's word</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
                <FlatList data={tvPrograms.rhapsody_stories} renderItem={renderRhapsodyTravels} numColumns={700}  />
          </ScrollView>


          <View style={{marginTop:5,marginBottom:5}}>
            <Text style={{color:'#F9A825',fontSize:16}}>YOUR LOVEWORLD</Text>
            <Text style={{color:'#708090'}}>Your Lovewrold Specials with Pastor Chris</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
                <FlatList data={tvPrograms.rhapsody_travels} renderItem={renderRhapsodyTravels} numColumns={700}  />
          </ScrollView>

          <View style={{marginTop:5,marginBottom:5}}>
            <Text style={{color:'#F9A825',fontSize:16}}>ROPC</Text>
            <Text style={{color:'#708090'}}>Rhapsody Online Prayer Conference</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
                <FlatList data={tvPrograms.ropc} renderItem={renderRhapsodyTravels} numColumns={700}  />
          </ScrollView>

          <View style={{marginTop:5,marginBottom:5}}>
            <Text style={{color:'#F9A825',fontSize:16}}>GDOP</Text>
            <Text style={{color:'#708090'}}>Global Day of Prayer</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
                <FlatList data={tvPrograms.gdop} renderItem={renderRhapsodyTravels} numColumns={700}  />
          </ScrollView>

          <View style={{marginTop:5,marginBottom:5}}>
            <Text style={{color:'#F9A825',fontSize:16}}>RIN</Text>
            <Text style={{color:'#708090'}}>Rhapsody Influencers Network</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
                <FlatList data={tvPrograms.rin} renderItem={renderRhapsodyTravels} numColumns={700}  />
          </ScrollView>



          <View style={{marginTop:5,marginBottom:5}}>
            <Text style={{color:'#F9A825',fontSize:16}}>QUBATORS TECHVISION</Text>
            <Text style={{color:'#708090'}}>Qubators Techvision</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
                <FlatList data={tvPrograms.techvision} renderItem={renderRhapsodyTravels} numColumns={700}  />
          </ScrollView>

          <View style={{marginTop:5,marginBottom:5}}>
            <Text style={{color:'#F9A825',fontSize:16}}>HACKATHON</Text>
            <Text style={{color:'#708090'}}>Rhapsody Hackathon</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
                <FlatList data={tvPrograms.hackathon} renderItem={renderRhapsodyTravels} numColumns={700}  />
          </ScrollView>




        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:15
  }
  });

export default RhapsodyTVScreen;