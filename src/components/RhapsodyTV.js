import React , { useEffect, useState } from 'react';
import { View, StyleSheet,Text, FlatList,Button,ScrollView,Image } from 'react-native';
import { getFeaturedTV } from '../service/featuredTVService';
import {Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const RhapsodyTV = () => {
  const navigation = useNavigation();


  const [tvz, setTvs] = useState([]);
 
  useEffect(() => {

      const fetchData = async () => {
          const data = await getFeaturedTV()
          setTvs(data)
      }
      fetchData();

  }, []);

 

  const renderFeaturedTvs = ({ item }) => {

    const img = item.thumbnail;
    const id = item.videoid;

    
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('VideoDetail',{videoid:id});
      }}>
      <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
          <Image
            source={{uri:img}}
            style={{
              height: windowHeight*0.15,
              width: windowWidth*0.45,
            }}
            // resizeMode="contain"
          />
          <Image
            source={require('../assets/play_thumb.png')}
            style={{
              alignSelf:'center',
              height: 50,
              width: 50,
              marginTop:-windowHeight*0.10
            }}
            // resizeMode="contain"
          />
        <View style={{ padding: 10, width: windowWidth*0.45, height:90,marginTop:windowHeight*0.05 }}>
          <Text style={{flexWrap: 'wrap',alignSelf:'center'}}>{item.title}</Text>
        </View>
      </View>
      </TouchableOpacity>
      </View>
    );
  };


return (
  <>
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList data={tvz} renderItem={renderFeaturedTvs} numColumns={10} />
      </ScrollView>
    </View>
    
  </>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  marginTop: 10,
}
});

export default RhapsodyTV;