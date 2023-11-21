import React , { useEffect, useState } from 'react';
import { View, StyleSheet,Text, FlatList,Button,ScrollView,Image } from 'react-native';
import { getFeaturedTV } from '../service/featuredTVService';



const RhapsodyTV = () => {


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
    
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
      <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
          <Image
            source={{uri:img}}
            style={{
              height: 150,
              width: 200
            }}
            // resizeMode="contain"
          />
        <View style={{ padding: 10, width: 200, height:90 }}>
          <Text style={{flexWrap: 'wrap',alignSelf:'center'}}>{item.title}</Text>
        </View>
      </View>
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