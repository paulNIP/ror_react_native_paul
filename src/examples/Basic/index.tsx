import React,{useState,useEffect} from 'react';
import * as DocumentPicker from 'expo-document-picker';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,Platform,
  View,StyleSheet,TextInput,FlatList,ActivityIndicator
} from 'react-native';

import { Reader, ReaderProvider,useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { dark,light,sepia } from '../CustomThemes/themes';
import { BottomSheet ,ListItem,Button} from '@rneui/themed';
import { Overlay } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions, PanResponder,ScrollView,} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import RNFS from 'react-native-fs';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';


// const epub =
//   'https://rhapsodyofrealities.b-cdn.net/app/books/epub2024-april.epub';
const epub ='https://epubjs-react-native.s3.amazonaws.com/failing-forward.epub';
const opf = 'https://s3.amazonaws.com/moby-dick/OPS/package.opf';

const windowHeight = Dimensions.get('window').height*0.6;
const windowWidth = Dimensions.get('window').width*0.8;



function Inner() {
  const { width, height } = useWindowDimensions();
  const { goNext, goPrevious ,changeTheme,changeFontFamily,
    changeFontSize,search, searchResults, goToLocation, 
    getLocations,
    getCurrentLocation,
    removeSelection,
    addBookmark,
    updateBookmark,
    removeBookmark,
    removeBookmarks} = useReader();
  const [term, setTerm] = React.useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [highlightVisible, setHighlightVisible] = useState(false);
  const [tocVisible, setTOCVisible] = useState(false);
  const [appFile, setAppFile] = useState<boolean>();

  const [selectedIndex,setSelectedIndex] =useState(0)
  const [readerHeight,setReaderHeight] =useState(0)

  const [epubDownloaded,setEpubDownloaded] =useState(false)

    
  const handleIndexChange = (index:any) => {
        setSelectedIndex(index)
  }

  const toggleOverlay = () => {
    setHighlightVisible(!highlightVisible);
  };

  const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+epub.split("/").pop();


    return (
      <SafeAreaView style={{ flex: 1 }}>

     <HeaderRNE 
    
      leftComponent={{
        icon: 'menu',
        color: '#D8A623',
      }}
      rightComponent={
          <View style={styles.headerRight}>
              <TouchableOpacity style={{justifyContent:'center',alignContent:'center',marginRight:10}} onPress={()=>{}}>
                 <MaterialCommunityIcons  name='arrow-left' size={25} color='#D8A623'/>
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:'center',alignContent:'center' ,marginRight:10}} onPress={()=>{}}>
                 <MaterialCommunityIcons  name='menu' size={25} color='#D8A623' style={{marginLeft:10}}/>
              </TouchableOpacity>

              <TouchableOpacity style={{justifyContent:'center',alignContent:'center',marginRight:10}} 
              onPress={()=>setIsVisible(true)}>
                 <MaterialCommunityIcons  name='cog' size={25} color='#D8A623'/>
              </TouchableOpacity>

              <TouchableOpacity style={{justifyContent:'center',alignContent:'center',marginRight:10}} 
              onPress={()=>changeFontFamily}>
                 <MaterialCommunityIcons  name='format-font' size={25} color='#D8A623'/>
              </TouchableOpacity>

              <TouchableOpacity style={{justifyContent:'center',alignContent:'center',marginRight:10}} 
               onPress={()=>changeFontSize('60px')}>
                 <MaterialCommunityIcons  name='format-font-size-increase' size={25} color='#D8A623'/>
              </TouchableOpacity>

              <TouchableOpacity style={{justifyContent:'center',alignContent:'center',marginRight:10}} onPress={()=>{}}>
                 <MaterialCommunityIcons  name='file-edit-outline' size={25} color='#D8A623'/>
              </TouchableOpacity>

              <TouchableOpacity style={{justifyContent:'center',alignContent:'center'}} onPress={()=>{}}>
                 <MaterialCommunityIcons  name='magnify' size={25} color='#D8A623'/>
              </TouchableOpacity>
          </View>
      }
      // centerComponent={{ text: 'Header', style: styles.heading }}
    />


         <View style={styles.options}>
            <TouchableOpacity onPress={() => goPrevious()}>
              <Text>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goNext()}>
              <Text>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Text>Themes</Text>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => setHighlightVisible(true)}>
              <Text>Highlight</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTOCVisible(true)}>
              <Text>Table</Text>
            </TouchableOpacity>
  
         </View>
         <View style={styles.searchSection}>
            {/* <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000"/> */}
            <MaterialCommunityIcons  name='arrow-left' size={20} color='#D8A623'/>
            <TextInput
                style={styles.input}
                placeholder="Type a name to search"
                onChangeText={(text) => setTerm(text)}
                underlineColorAndroid="transparent"
            />
            
            <TouchableOpacity
            onPress={() => {
              
              search(term);
              }}
             >
            <MaterialCommunityIcons  name='magnify' size={20} color='#D8A623'/>
          </TouchableOpacity>
        </View>
  
        
        <Reader
          src={epub}
          width={width}
          enableSelection={true}
          enableSwipe={true}
          height={height*0.2}
          fileSystem={useFileSystem}
        />
  
        {/* set the theme of the reader */}
        <BottomSheet modalProps={{}} isVisible={isVisible}>
          <View style={{height:height*0.15}}>
          <View style={{backgroundColor:'#D8A623',height:30,justifyContent:'center'}}>
            <Text style={{fontWeight:'bold',color:'white',alignSelf:'center'}}>Change to Day/Night Mode</Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity onPress={() =>
                {
                  changeTheme(light);
                  setIsVisible(!isVisible);
                } 
              }>
              <Text>Light Theme</Text>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => 
                        {
                          changeTheme(dark);
                          setIsVisible(!isVisible);
                        } 
             
             }>
              <Text>Dark Theme</Text>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => 
                                  {
                                    changeTheme(sepia);
                                    setIsVisible(!isVisible);
                                  }                    
              }>
              <Text>Sepia Theme</Text>
            </TouchableOpacity>
          </View>
          </View>
        </BottomSheet>
        {/* end of reader theme */}
  
        {/* flat list for search results only shown when search text available */}


  
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goToLocation(item.cfi)}>
              <Text>{item.excerpt}</Text>
            </TouchableOpacity>
          )}
        />
         {/* end  of flat list for search results */}
  
        {/* Hightlight overlay */}
        <Overlay isVisible={highlightVisible} onBackdropPress={toggleOverlay} 
        fullScreen={false}
        overlayStyle={{width:Dimensions.get('window').width,height:Dimensions.get('window').height*0.9}}
        
        >
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <View style={{height:30,alignContent:'center',justifyContent:"center"}}>
            <TouchableOpacity onPress={()=>setHighlightVisible(!highlightVisible)}>
             <MaterialCommunityIcons  name='close' size={20} color='#D8A623'/>
             </TouchableOpacity>
          </View>
          <View style={{height:40}}>
            <TouchableOpacity style={{backgroundColor:'#D8A623',
                          alignContent:'center',justifyContent:"center",height:30}}>
              <Text style={{marginLeft:40,marginRight:40,color:"white"}}>Highlights</Text>
            </TouchableOpacity>
  
          </View>
          <View style={{height:40}}>
  
          </View>
  
        </View>
        <View>
        <ListItem.Swipeable
            rightContent={(reset) => (
              <>
              <Button
                onPress={() => reset()}
                icon={{ name: 'edit', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'blue' }}
              />
              <Button
                onPress={() => reset()}
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              />
              </>
            )}
          >
          <ListItem.Content>
            <ListItem.Title>Hello Swiper</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
        </View>
        </Overlay>
        {/* end of highlight overlay */}
  
  
        {/* table of contents */}
  
        <Overlay isVisible={tocVisible} onBackdropPress={toggleOverlay} 
        fullScreen={false}
        overlayStyle={{width:Dimensions.get('window').width,height:Dimensions.get('window').height*0.9}}
        
        >
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <View style={{height:30,alignContent:'center',justifyContent:"center"}}>
            <TouchableOpacity onPress={()=>setTOCVisible(!tocVisible)}>
             <MaterialCommunityIcons  name='close' size={20} color='#D8A623'/>
             </TouchableOpacity>
          </View>
          <View style={{height:40}}>
            {/* <TouchableOpacity style={{backgroundColor:'#D8A623',
                          alignContent:'center',justifyContent:"center",height:30}}>
              <Text style={{marginLeft:40,marginRight:40,color:"white"}}>Highlights</Text>
            </TouchableOpacity> */}
            <SegmentedControlTab 
              values	          = { ["  Contents  ", "  HighLights  "] }
              selectedIndex	   = { selectedIndex }
              onTabPress      = { handleIndexChange }
              tabsContainerStyle = { styles.tabContainerStyle } 
              tabStyle	   = { styles.tabStyle }
              tabTextStyle	   = { styles.tabTextStyle }
              activeTabStyle	   = { styles.activeTabStyle }
              activeTabTextStyle = { styles.activeTabTextStyle }
  
            />
  
          </View>
          <View style={{height:40}}>
  
          </View>
  
        </View>
        <View>
        {selectedIndex === 0 ? (
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Inbox</ListItem.Title>
            </ListItem.Content>
          </ListItem>
  
        </ScrollView>
        </>
        ) :
  
        (
          <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Inbox 26373</ListItem.Title>
              </ListItem.Content>
            </ListItem>
    
          </ScrollView>
          </>
          )
        
          }
          
        </View>
        </Overlay>
        {/* end of table of contents */}


        
        
      </SafeAreaView>
    );

  


}

export function Basic() {
  const { width, height } = useWindowDimensions();
  const [src, setSrc] = React.useState(epub);
  return (
    <SafeAreaView style={styles.container}>
      <ReaderProvider>
        <Inner/>
      </ReaderProvider>
    </SafeAreaView>
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
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  options: {
    width: '100%',
    flexDirection: 'row',
    marginBottom:15,
    marginTop:15,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  currentFormat: {
    textAlign: 'center',
  },

  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height:100
},
searchIcon: {
    padding: 10,
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
},

tabContainerStyle: {	// the tab container
  // backgroundColor: '#D8A623',
  width: Dimensions.get('window').width*0.6, height: 'auto',
  borderRadius: 0,
},

tabStyle: { 		// tab not selected
  backgroundColor: '#FFFFFF',
  margin: 0
},
tabTextStyle: { 	// text of the unselected tab
  color: '#000000'

},

activeTabStyle: { 	// tab selected
  backgroundColor: '#D8A623',

},

activeTabTextStyle: { // selected tab's text
  color: '#FFFFFF'
},

textStyle: {
  color: 'white',
}
  });
  

