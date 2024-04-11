import React  from 'react';
import { View, StyleSheet, ActivityIndicator,Text} from 'react-native';
import {Dimensions} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoadingComponent=()=> {

    return (

      <>
      <View style={styles.container}>
         <ActivityIndicator />
         <Text>Download Book ...</Text>
      </View>
      
    </>
      
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    alignSelf:'center',
  },
  video: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.23,
    marginTop:10,
    marginBottom:10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingComponent;