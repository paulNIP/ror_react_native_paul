import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,View,
  StatusBar,ActivityIndicator
} from 'react-native';


import HTMLView from 'react-native-htmlview';
import { getPrivacyPolicy } from '../service/storeService';


const PrivacyPolicy = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [privacy, setPrivacy] = useState();

    useEffect(() => {


        const fetchData = async () => {
            const data = await getPrivacyPolicy();
            setPrivacy(data);
            console.log("Privacy Data Data",data);
            setIsLoading(false);
            
  
        }
        
        fetchData();
  
      }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View>
            {isLoading && (
                <View style={{  
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                <ActivityIndicator
                    style={{ height: 80 }}
                    color="#FFFFFF"
                    size="large"
                />
                </View>
                )}

                {privacy &&(
                    <HTMLView style={{marginTop:10}}
                    value={privacy}
                    onLinkPress={(url) => {

                    }}
                    stylesheet={webViewStyle}
                    
                    />

                )}
                
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
});

const webViewStyle = StyleSheet.create({ 
    p: { fontSize:16 } ,
    a:{
      textDecorationLine:'underline',
    color:'#007cc0'}
  });

export default PrivacyPolicy;