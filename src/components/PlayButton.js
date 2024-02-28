import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PlayButton(props) {
  return (
    <TouchableOpacity
      style={styles.playButtonContainer}
      onPress={props.onPress}>
      {/* <FontAwesome name={props.state} size={32} color="#3D425C" /> */}
      <MaterialCommunityIcons  name={props.state} size={35} color='#3D425C' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  playButtonContainer: {
    backgroundColor: '#FFF',
    borderColor: 'rgba(93, 63, 106, 0.2)',
    borderWidth: 8,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    shadowColor: '#5D3F6A',
    shadowRadius: 15,
    shadowOpacity: 0.5,
  },
});