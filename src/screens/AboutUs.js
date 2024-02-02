import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,View,
  StatusBar
} from 'react-native';


import { Divider} from '@rneui/themed';
import { Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VersionCheck from 'react-native-version-check';


const AboutUs = () => {

  const version = VersionCheck.getCurrentVersion();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
            <View>
                
            <View style={[styles.card, styles.shadowProp]}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:50,height:50,marginEnd:10}}
                        source={require('../assets/logo.png')} />
                        <Divider orientation="vertical" width={5} />
                        <View style={{alignContent:"center",justifyContent:"center",marginLeft:10}}>
                            <Text style={{flexWrap:'wrap',fontSize:18}}>
                                Rhapsody of Realities
                            </Text>

                        </View>
                    </View>
                    
                </View>

                <View style={[styles.card, styles.shadowProp]}>
                    <View style={{flexDirection:'row'}}>
                      <MaterialCommunityIcons  style={{alignContent:'center',justifyContent:'center',marginEnd:10}}
                        name="information" size={50} color="#D8A623" /> 
                        <Divider orientation="vertical" width={5} />
                        <View style={{alignContent:"center",justifyContent:"center",marginLeft:10}}>
                            <Text style={{flexWrap:'wrap'}}>
                                Version
                            </Text>
                            <Text style={{flexWrap:'wrap'}}>
                               {version}
                            </Text>
                        </View>
                    </View>
                    
                </View>

                <View style={[styles.card, styles.shadowProp]}>
                    <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons  style={{alignContent:'center',justifyContent:'center',marginEnd:10}}
                        name="email" size={50} color="#D8A623" /> 
                       
                        <Divider orientation="vertical" width={5} />
                        <View style={{alignContent:"center",justifyContent:"center",marginLeft:10}}>
                            <Text style={{flexWrap:'wrap'}}>
                                Email
                            </Text>
                            <Text style={{flexWrap:'wrap'}}>
                            info@rhapsodyofrealities.org
                            </Text>
                        </View>
                    </View>
                    
                </View>

                <View style={[styles.card, styles.shadowProp]}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:50,height:50,marginEnd:10}}
                        source={require('../assets/logo.png')} />
                        <Divider orientation="vertical" width={5} />
                        <View style={{alignContent:"center",justifyContent:"center",marginLeft:10}}>
                            <Text style={{flexWrap:'wrap'}}>
                                Website
                            </Text>
                            <Text style={{flexWrap:'wrap'}}>
                               www.rhapsodyofrealities.org
                            </Text>
                        </View>
                    </View>
                    
                </View>

                <View style={[styles.card, styles.shadowProp]}>
                    <Text style={{fontWeight:"bold"}}>
                    About
                    </Text>
                    <Text style={{flexWrap:'wrap'}}>
                    Rhapsody of Realities is no ordinary book: It’s a classic love-note from God to you, with the message of life!
                     Oftentimes, referred to as the, “Messenger Angel,” the devotional is a life guide designed to enhance your 
                    spiritual growth and development by bringing you a fresh perspective from God’s Word every day.
                    </Text>
                </View>
            
            </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 5,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default AboutUs;