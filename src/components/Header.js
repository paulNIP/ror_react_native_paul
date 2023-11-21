import React from 'react';
import {
StyleSheet,
View,
Linking,
} from 'react-native';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Header= () => {

const docsNavigate = () => {
  Linking.openURL(`https://reactnativeelements.com/docs/`);
};

const playgroundNavigate = () => {
  Linking.openURL(`https://@rneui/themed.js.org/#/`);
};

return (
  <SafeAreaProvider>
    <HeaderRNE
      leftComponent={{
        icon: 'menu',
        color: '#fff',
      }}
      rightComponent={
        { text: 'FEEDBACK', style: styles.heading }
      }
      centerComponent={{ text: 'Welcome', style: styles.heading }}
    />
  </SafeAreaProvider>
);
};

const styles = StyleSheet.create({
headerContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#397af8',
  marginBottom: 20,
  width: '100%',
  paddingVertical: 15,
},
heading: {
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
},
headerRight: {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5,
},
subheaderText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
});

export default Header;