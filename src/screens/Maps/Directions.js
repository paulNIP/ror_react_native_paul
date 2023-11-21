import React ,{useState} from 'react';
import { View, StyleSheet } from 'react-native';
// import MapView , { Marker , PROVIDER_GOOGLE } from 'react-native-maps';

const Directions=()=> {

    return (
      <View style={styles.container}>
        {/* <MapView style={styles.map}
            // provider={PROVIDER_GOOGLE} // Specify Google Maps as the provider
            initialRegion={{
                latitude: 7.8731,
                longitude: 80.7718,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            >
            </MapView> */}
        
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  map: {
    flex: 1,
  },

});

export default Directions;