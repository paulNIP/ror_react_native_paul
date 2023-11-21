import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,SafeAreaView,ScrollView,StatusBar} from 'react-native';
import WordOfMonth from '../components/WordOfMonth';
import DailyDevotional from '../components/DailyDevotional';
import PremiumNotification from '../components/PremiumNotification';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AdsSlider from '../components/AdsSlider';
import LatestBooks from '../components/LatestBooks';
import RhapsodyTV from '../components/RhapsodyTV';
import { Divider} from '@rneui/themed';
import { Button } from '@rneui/themed';
import LiveTV from '../components/LiveTV';
import RecentArticles from '../components/RecentArticles';

//Import ActionButton
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const HomeScreen= ({navigation}) => {



return (
  
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView} >
      <View >
      <StatusBar
            translucent
            backgroundColor="#F9A825"
            barStyle="light-content"
          />

        <DailyDevotional/>
        <PremiumNotification/>
        <RecentArticles/>

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between',marginBottom:20 }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>RHAPSODY TV</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Real Impact, Real Stories</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline" color="warning" />
          </View>
          </View>
        </View>
        <LiveTV/>
        <AdsSlider/>


        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />

          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>LATEST BOOKS</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Books by Pastor Chris Oyakhilome</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline" color="warning"/>
          </View>
        </View>
        </View>

        <LatestBooks/>

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>RHAPSODY TV</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Real Impact, Real Stories</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>
        
        <RhapsodyTV/>

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>RHAPSODY NEWS</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Your latest news from Rhapsody of Realities</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            {/* <Button title="VIEW ALL" type="outline" /> */}
          </View>
          </View>
        </View>
        <WordOfMonth/>

        <ActionButton buttonColor="#F9A825">
          {/*Inner options of the action button*/}
          {/*Icons here
             https://infinitered.github.io/ionicons-version-3-search/
           */}
          <ActionButton.Item
            buttonColor="#F9A825"
            title="Change Theme"
            onPress={() => alert('Change Theme')}>
            <MaterialCommunityIcons style={{alignSelf:'center'}} name="format-paint" size={30} color="white" />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#F9A825"
            title="Notes"
            onPress={() => alert('Notes clicked')}>
            <MaterialCommunityIcons style={{alignSelf:'center'}} name="lead-pencil" size={30} color="white" />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </ScrollView>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F6F6F6'
  },
  scrollView: {
    marginHorizontal: 5,
  },
  vertical: {
    marginBottom: 5,
    marginHorizontal:10,
    display: 'flex',
    flexDirection: 'row',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

  

export default HomeScreen;