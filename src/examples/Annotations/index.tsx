/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {useState,useCallback, useEffect} from 'react';
import { SafeAreaView,Animated,FlatList,View,TouchableOpacity,
  ScrollView,TextInput,Text, StyleSheet, useWindowDimensions,Dimensions,Linking } from 'react-native';
import {
  Annotation,
  Reader,
  ReaderProvider,
  useReader,Bookmark
} from '@epubjs-react-native/core';
import { useNavigation } from '@react-navigation/native';
import { useFileSystem } from '@epubjs-react-native/file-system';
import BottomSheet, { BottomSheetView,BottomSheetTextInput, } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView,Swipeable } from 'react-native-gesture-handler';
import AnnotationForm, { COLORS } from './AnnotationForm';
import {  Icon,ListItem } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modal} from 'react-native';
import { IconButton,Button,MD3Colors } from 'react-native-paper';
import { light,dark,sepia } from '../CustomThemes/themes';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Toc } from '@epubjs-react-native/core';
import Slider from '@react-native-community/slider';
import { DatabaseConnection } from '../../database/database-connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';



function Book(props:any) {


  const epub=props.file;
  // // const epub=props.file;

  // // const epub='https://rhapsodyofrealities.b-cdn.net/app/books/test/epub2024_April_test.epub';

  // const epub='https://rhapsodyofrealities.b-cdn.net/app/books/test/epub2024-april-2.epub';
  const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+epub.split("/").pop();

  const loc=props.location;
  const db = DatabaseConnection.getbookmarked_articles_databaseDB();

  const navigation =useNavigation();
  const { width, height } = useWindowDimensions();
  const [sliderValue1, setSliderValue1] = useState(11);
  const { addAnnotation, removeAnnotation, annotations } = useReader();
  const { goNext, goPrevious ,changeTheme,changeFontFamily,
    changeFontSize,search, searchResults, goToLocation, 
    getLocations,
    getCurrentLocation,
    removeSelection,
    addBookmark,
    updateBookmark,
    removeBookmark,
    removeBookmarks} = useReader();


  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:'',
      headerLeft: () => (
        <IconButton
            icon="menu"
            size={22}
            onPress={() => {
              setModalTOCVisible(true);
            }}
          />
       ),
      headerRight: () => (
        <View style={{flexDirection:'row'}}>
          <IconButton
            icon='arrow-left'
            size={20}
            animated
            onPress={()=>{
              navigation.goBack();
            }}
          /> 

          <IconButton
            icon='cog'
            size={20}
            animated
            onPress={() => {
               bottomSheetThemeRef.current?.snapToIndex(0);
            }}
          /> 
          <IconButton
            icon='lead-pencil'
            size={20}
            animated
            onPress={()=>{
              setModalVisible(true);
            }}
          /> 
            <IconButton
            icon='skip-previous'
            size={20}
            animated
            onPress={()=>{
              goPrevious();
            }}
          /> 
            <IconButton
            icon='skip-next'
            size={20}
            animated
            onPress={()=>{
              goNext();
            }}
          /> 

          <IconButton
            icon='magnify'
            size={20}
            animated
            onPress={()=>{
              bottomSheetSearchRef.current?.snapToIndex(0);
            }}
          />    

        </View>
       )
    });
}, [navigation]);




  const [selection, setSelection] = React.useState<{
    cfiRange: string;
    text: string;
  } | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = React.useState<
    Annotation | undefined
  >(undefined);
  const [tempMark, setTempMark] = React.useState<Annotation | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const bottomSheetThemeRef = React.useRef<BottomSheet>(null);
  const bottomSheetBookmarkRef = React.useRef<BottomSheet>(null);
  const bottomSheetSearchRef = React.useRef<BottomSheet>(null);
  const bottomSheetNotesRef = React.useRef<BottomSheet>(null);


  const snapPoints = React.useMemo(() => ['50%', '75%', '100%'], []);
  const [term, setTerm] = React.useState('');
  const [defaultLocation, setDefaultLocation] = useState<any>();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTOCVisible, setModalTOCVisible] = useState(false);
  const [bookmarkModalVisible, setBookmarkModalVisible] = useState(false);
  const {
    bookmarks,
    isBookmarked,
    currentLocation,
  } = useReader();

  const { toc, section } = useReader();
  const [data, setData] = useState(toc);
  const [email, setEmail] = useState<any>();

  const [note, setNote] = useState('');
  const [tocContent, setTocContent] = useState();
  const [currentBookmark, setCurrentBookmark] = useState<Bookmark | null>(null);

  const [selectedIndex,setSelectedIndex] =useState(0)
  const handleIndexChange = (index:any) => {
      setSelectedIndex(index)
  }

  let [highlightListItems, setHightlightListItems] = useState([]);



  useEffect(() => {
    if (isBookmarked) {
      const bookmark = bookmarks.find(
        (item) =>
          item.location?.start.cfi === currentLocation?.start.cfi &&
          item.location?.end.cfi === currentLocation?.end.cfi
      );

      if (!bookmark) return;

      setCurrentBookmark(bookmark);
      setNote(bookmark.data?.note || '');
    }
    const getMail=async() =>{
      const mail =await AsyncStorage.getItem('email');
      if(mail){
        setEmail(mail);
      }

      const book_name = epub.split("/").pop();

      //select all highlights previous DB
      db.transaction((tx:any) => {
        tx.executeSql(
          'SELECT * FROM epub_book_highlights WHERE email=? AND book_name=?',
          [email,book_name],
          (tx:any, results:any) => {
            var temp:any = [];

            for (let i = 0; i < results.rows.length; i++)
              var hightlight=results.rows.item(i).article_highlighted;
              temp.push(JSON.parse(hightlight));
            setHightlightListItems(temp);
          }
        );
      });


      //select all highlights 


    }
    getMail();


    const ids = toc.map(({ id }) => id);
    const filtered = toc.filter(({ id }, index) =>
        !ids.includes(id, index + 1));
    setData(filtered);

  }, [

    bookmarks,
    currentLocation?.end.cfi,
    currentLocation?.start.cfi,
    isBookmarked,toc
  ]);



  interface Props {
    annotations: Annotation[];
    onClose: () => void;
  }



 
  const handleChangeBookmark = () => {
    const location = getCurrentLocation();
    console.log(location);

    if (!location) return;

    if (isBookmarked) {
      const bookmark = bookmarks.find(
        (item) =>
          item.location.start.cfi === location?.start.cfi &&
          item.location.end.cfi === location?.end.cfi
      );

      if (!bookmark) return;
      removeBookmark(bookmark);
    } else addBookmark(location);
  };
  
  interface IRow {
    id: string;
    title: string;
  }

  
  


  
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<any>,
    dragX: Animated.AnimatedInterpolation<any>,
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
  
    return (
      <View style={styles.swipedRow}>
        <Animated.View style={[styles.editButton, {opacity}]}>
          <TouchableOpacity style={{marginLeft:15,marginRight:15}}>
            <Icon name="note-edit-outline" type="material-community" color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.deleteButton, {opacity}]}>
          <TouchableOpacity style={{marginLeft:15,marginRight:15}} onPress={()=>{
            //Remove annotation
          //   if (annotation.data?.key) {
          //     const withMarkAnnotations = annotations.filter(
          //       ({ data }) => data.key === annotation.data.key
          //     );
  
          //     withMarkAnnotations.forEach((item) => {
          //       removeAnnotation(item);
          //     });
          //   } else {
          //     removeAnnotation(annotation);
          //   }
          //   onClose();
          // }
            
          }}>
          <Icon name="delete" type="material-community" color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };


  return (
    <GestureHandlerRootView>
      <Reader
        src={EPUB_PATH}
        width={width}
        height={height*0.80}
        fileSystem={useFileSystem}
        onAddBookmark={(bookmark) => console.log('onAddBookmark', bookmark)}
        onRemoveBookmark={(bookmark) =>
          console.log('onRemoveBookmark', bookmark)
        }
        onUpdateBookmark={(bookmark) =>
          console.log('onUpdateBookmark', bookmark)
        }
        onReady={()=>{
          // if initial location set
          if(loc){
            //goto default date of daily devotional
            let obj =Object.entries(data);
            obj.map((j) => {
              let chap=j[1].label.trim().toLowerCase();
              if(chap.startsWith(loc.toLowerCase())){
                // console.log("Location sgshhhsjsj",j[1].href);
                let initialloc:any =j[1].href;
                goToLocation(initialloc);
              }
            
            });

          }

        }}
        onPressExternalLink={(url) => {
          Linking.openURL(url);
        }}
        // onChangeBookmarks={(bookmarks) =>
        //   console.log('onChangeBookmarks', bookmarks)
        // }
        enableSelection
        // initialLocation={defaultLocation}
        initialAnnotations={
              highlightListItems[0]
        }
        onAddAnnotation={(annotation) => {
          if (annotation.type === 'highlight' && annotation.data?.isTemp) {
            setTempMark(annotation);
          }
        }}
        onPressAnnotation={(annotation) => {
          setSelectedAnnotation(annotation);
          setModalVisible(true);;

        }}
        onChangeAnnotations={(annotation) => {

          const date = new Date();
          const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric',hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const formattedDate = formatter.format(date);
          const book_name = epub.split("/").pop();
          const article_highlighted =JSON.stringify(annotation);
   
          // const epub
          db.transaction(function (txn:any) {
            txn.executeSql(
              "SELECT * FROM epub_book_highlights WHERE book_name=? AND email=?",
              [book_name,email],
              function (txn:any, resp:any) {
                // insert into DB no existing highlights
                if (resp.rows.length == 0) {
                  db.transaction((tx:any) => {
                    tx.executeSql(
                      'INSERT INTO epub_book_highlights (email,book_name, article_highlighted, article_highlight_date_key, instancename) VALUES (?, ?,?,?,?)',
                      [ email,
                        book_name,
                        article_highlighted,
                        formattedDate,
                        '1'],
                      (tx:any, results:any) => {
                        console.log('INSERT successfull');
                      },
                      (error:any) => {
                        console.error('Error executing INSERT SQL: ', error);
                      }
                    );
                  });
                }else{
                  //Update highlights
                  db.transaction((txp:any) => {
                    txp.executeSql(
                      'UPDATE epub_book_highlights set article_highlighted=?',
                      [article_highlighted],
                      (txp:any, resultsp:any) => {
                        console.log('Results', resultsp.rowsAffected);
                        if (resultsp.rowsAffected > 0) {
                          console.log("Updated sucessfulyyuu");
                          
                        } else {
                          console.log("Failed to update record");
                        }
                      }
                    );
                  });
                }
              }
            );
          });

          


        }}
        menuItems={[
          {
            label: '🟡',
            action: (cfiRange) => {
              addAnnotation('highlight', cfiRange, undefined, {
                color: COLORS[2],
              });
              return true;
            },
          },
          {
            label: '🔴',
            action: (cfiRange) => {
              addAnnotation('highlight', cfiRange, undefined, {
                color: COLORS[0],
              });
              return true;
            },
          },
          {
            label: '🟢',
            action: (cfiRange) => {
              addAnnotation('highlight', cfiRange, undefined, {
                color: COLORS[3],
              });
              return true;
            },
          },
          {
            label: 'Add Note',
            action: (cfiRange, text) => {
              setSelection({ cfiRange, text });
              addAnnotation('highlight', cfiRange, { isTemp: true });
              bottomSheetRef.current?.snapToIndex(0);
              return true;
            },
          },
        ]}
      />
      <View style={{width: 200, height: 20,opacity:0.4,backgroundColor:'#FFFFFF', alignItems:"center",alignSelf:'center',
      alignContent:'center',
      position:'absolute', top:height-180}}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => goPrevious()}>
             <Text>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goNext()}>
            <Text> / Next</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => {
            const location = getCurrentLocation();
            console.log(location);
            if (!location) return;
            if (isBookmarked) {
                  const bookmark = bookmarks.find(
                    (item) =>
                      item.location.start.cfi === location?.start.cfi &&
                      item.location.end.cfi === location?.end.cfi
                  );

                  if (!bookmark) return;
                  removeBookmark(bookmark);
                } else addBookmark(location);
             }}>
            <Text> / Next</Text>
          </TouchableOpacity> */}
          
        </View>

      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        enablePanDownToClose
        onClose={() => {
          setSelection(null);
          if (tempMark) removeAnnotation(tempMark);
          setTempMark(null);
          setSelectedAnnotation(undefined);
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <AnnotationForm
            annotation={selectedAnnotation}
            selection={selection}
            onClose={() => {
              bottomSheetRef.current?.close();
              if (tempMark) removeAnnotation(tempMark);
              setTempMark(null);
            }}
          />

          {/* <AnnotationsList
            annotations={annotations}
            onClose={() => bottomSheetRef.current?.close()}
          /> */}
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetThemeRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        enablePanDownToClose
        onClose={() => {
          setSelection(null);
          if (tempMark) removeAnnotation(tempMark);
          setTempMark(null);
          setSelectedAnnotation(undefined);
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
            <View style={styles.title}>
              <Text>Change to Day/Night Mode</Text>
            </View>
            <View>
                    <ListItem bottomDivider containerStyle={{width:400,marginLeft:20}} 
                    onPress={()=>changeTheme(light)}>
                    <Icon name="white-balance-sunny" type="material-community" color="grey" />
                    <ListItem.Content>
                        <ListItem.Title>Light Theme</ListItem.Title>
                        </ListItem.Content>
                        </ListItem>
                    
                    <ListItem bottomDivider containerStyle={{width:400,marginLeft:20}}
                      onPress={()=>changeTheme(dark)}>
                    <Icon name="moon-waning-crescent" type="material-community" color="#000000" />
                    <ListItem.Content>
                        <ListItem.Title>Dark Theme</ListItem.Title>
                        </ListItem.Content>
                        </ListItem>

                        <ListItem bottomDivider containerStyle={{width:400,marginLeft:20}}
                         onPress={()=>changeTheme(sepia)}>
                        <Icon name="moon-waning-crescent" type="material-community" color="#704214" />
                    <ListItem.Content>
                        <ListItem.Title>Sepia Theme</ListItem.Title>
                        </ListItem.Content>
                        </ListItem>
                </View>

                
      <View style={styles.contentView}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.roundButton}
            onPress={()=>{changeFontFamily('sans-serif');}}
            >
            <Text>Arial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}
            onPress={()=>{changeFontFamily('Verdana');}}
            >
            <Text>Verdana</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}
            onPress={()=>{
              changeFontFamily('Courier New');}}
            >
            <Text>Courier New</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}
            onPress={()=>{
              changeFontFamily('Brush Script MT');}}
            >
            <Text>Brush Script MT</Text>
          </TouchableOpacity>

          {/* Arial (sans-serif)
Verdana (sans-serif)
Tahoma (sans-serif)
Trebuchet MS (sans-serif)
Times New Roman (serif)
Georgia (serif)
Garamond (serif) */}
{/* Courier New (monospace)
Brush Script MT (cursive) */}

</ScrollView>
      </View>
      
              

                <View style={{margin:20}}>
                  <Text>Change to Font Size</Text>
                </View>
                <View style={{margin:20,flexDirection:'row'}}>
                  <MaterialCommunityIcons  name='format-font-size-decrease' size={20} color='#D8A623'/>
                  <Slider
                      style={{width: Dimensions.get('window').width*0.7, height: 40}}
                      minimumValue={0}
                      maximumValue={100}
                      minimumTrackTintColor="#000000"
                      maximumTrackTintColor="#000000"
                      step={1}
                      value={sliderValue1}
                      onValueChange={(value) => {
                        setSliderValue1(value);
                        changeFontSize(value+'px');
                      }
                      
                      }
                    />
                  <MaterialCommunityIcons  name='format-font-size-increase' size={20} color='#D8A623'/>
                </View>
        </BottomSheetView>
      </BottomSheet>

      {/* search bottomsheet */}
      <BottomSheet
        ref={bottomSheetSearchRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        enablePanDownToClose
        onClose={() => {
          setSelection(null);
          if (tempMark) removeAnnotation(tempMark);
          setTempMark(null);
          setSelectedAnnotation(undefined);
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
            <View style={styles.passwordContainer}>
  <TextInput
    style={styles.inputStyle}
      autoCorrect={false}
      placeholder="Type a name to Search"
      onChangeText={(text) => setTerm(text)}
    />
    <TouchableOpacity onPress={()=>{
      search(term);
    }}>
    <MaterialCommunityIcons  name='magnify' size={20} color='#D8A623'/>
    </TouchableOpacity>
    
    

</View>
            <View>
            <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                  <ListItem bottomDivider containerStyle={{width:400,marginLeft:20}}
                  onPress={() => goToLocation(item.cfi)}>
                <ListItem.Content>
                    <ListItem.Title>{item.excerpt}</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                )}
              />
            </View>
        </BottomSheetView>
      </BottomSheet>
      {/* end of search bottom sheet */}

      {/* Bookmark list */}
      <BottomSheet
            ref={bottomSheetBookmarkRef}
            index={-1}
            snapPoints={snapPoints}
            keyboardBehavior="fillParent"
            enablePanDownToClose
            onClose={() => {
            }}
          >
            <BottomSheetView style={styles.contentContainer}>
            <View style={styles.title}>
              <Text >Bookmarks</Text>

              {bookmarks.length > 0 && (
                <Button
                  mode="text"
                  onPress={() => {
                    removeBookmarks();
                    // onClose();
                  }}
                >
                  Clear All
                </Button>
              )}
            </View>

            {bookmarks.length === 0 && (
              <View style={styles.title}>
                <Text style={{ fontStyle: 'italic' }}>
                  No bookmarks...
                </Text>
              </View>
            )}

            {isBookmarked && (
              <View style={{ width: '100%' }}>
                <BottomSheetTextInput
                  defaultValue={note}
                  style={styles.input}
                  multiline
                  placeholder="Type an annotation here..."
                  onChangeText={(text) => setNote(text)}
                />

                <Button
                  mode="text"
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => updateBookmark(currentBookmark!.id, { note })}
                >
                  Update Annotation
                </Button>
              </View>
            )}

            {bookmarks.map((bookmark) => (
              <View key={bookmark.id} style={styles.bookmarkContainer}>
                <TouchableOpacity
                  style={styles.bookmarkInfo}
                  onPress={() => {
                    goToLocation(bookmark.location.start.cfi);
                    // onClose();
                  }}
                >
                  <View style={styles.bookmarkIcon}>
                    <IconButton icon="bookmark" size={20} />
                    <Text
                      style={styles.bookmarkLocationNumber}
                    >
                      {bookmark.location.start.location}
                    </Text>
                  </View>

                  <View style={styles.bookmarkInfoText}>
                    <Text numberOfLines={1} style={{ marginBottom: 2 }}>
                      Chapter: {bookmark.chapter.label}
                    </Text>

                    <Text numberOfLines={2} style={{ fontStyle: 'italic' }}>
                      {bookmark.text}
                    </Text>
                  </View>
                </TouchableOpacity>

                <IconButton
                  icon="trash-can-outline"
                  size={20}
                  iconColor={MD3Colors.error50}
                  onPress={() => {
                    removeBookmark(bookmark);
                    // onClose();
                  }}
                />
              </View>
            ))}

            </BottomSheetView>
          </BottomSheet>
      {/* end of bookmark list */}


      

      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View >
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:60}}>
          <View style={{height:30,alignContent:'center',justifyContent:"center"}}>
            <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
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
          <View style={{padding:5}}>
          <ScrollView style={{ width: '100%', marginVertical: 20 }}>


      {annotations
        .filter(
          (annotation) =>
            !annotation?.data?.isTemp && annotation.type !== 'mark'
        )
        .map((annotation) => (

          
          <View
            key={annotation.cfiRange}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}
          >

            <Swipeable renderRightActions={renderRightActions}>
                <View style={{marginBottom:10}} >
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold', marginRight:15}}>Apr 05,2024 | 0:44</Text>
                    <View style={{flexDirection:'row'}}>
                      <Icon name="arrow-left" type="material-community" color="#448EE4" size={15} />
                      <Text style={{color:'gray',marginLeft:5}}>Swipe to edit/delete</Text> 
                    </View>
                  </View>
                  <View style={{backgroundColor:annotation.styles?.color,marginTop:5,marginBottom:5}}>
                  {annotation.type === 'highlight' && (
                    <TouchableOpacity style={{backgroundColor:annotation.styles?.color}}
                        onPress={() => {
 
                          goToLocation(annotation.cfiRange);
                          setModalVisible(!modalVisible);
                        }}
                        >
                      <Text
                          style={{
                            flexWrap: 'wrap',
                          }}
                          numberOfLines={4}
                        >
                          {annotation.cfiRangeText}
                        </Text>
                      </TouchableOpacity>
                    
                    )}
                  
                  </View>
              </View>
            </Swipeable> 
          </View>
        ))}
    </ScrollView>
          </View>
        </View>
      </Modal>

      {/* table of contents modal */}
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalTOCVisible}
        onRequestClose={() => {
          setModalTOCVisible(!modalTOCVisible);
        }}>
        <View >
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:60}}>
          <View style={{height:30,alignContent:'center',justifyContent:"center"}}>
            <TouchableOpacity onPress={()=>setModalTOCVisible(!modalTOCVisible)}>
             <MaterialCommunityIcons  name='close' size={20} color='#D8A623'/>
             </TouchableOpacity>
          </View>
          <View style={{height:40}}>
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
          <View style={{padding:5}}>
          {selectedIndex === 0 ? (
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                  <ListItem bottomDivider containerStyle={{width:400,marginLeft:20}}
                  onPress={() => {
                    goToLocation(item.href);
                    // goToLocation(annotation.cfiRange);
                    setModalTOCVisible(!modalTOCVisible);
                    }}>
                <ListItem.Content>
                    <ListItem.Title>{item.label.trim()}</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                )}
              />
          
        </ScrollView>
        </>
        ) :
  
        (
          <>
          <ScrollView showsVerticalScrollIndicator={false}>

          {annotations
        .filter(
          (annotation) =>
            !annotation?.data?.isTemp && annotation.type !== 'mark'
        )
        .map((annotation) => (

          
          <View
            key={annotation.cfiRange}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}
          >

            <Swipeable renderRightActions={renderRightActions}>
                <View style={{marginBottom:10}} >
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold', marginRight:15}}>Apr 05,2024 | 0:44</Text>
                    <View style={{flexDirection:'row'}}>
                      <Icon name="arrow-left" type="material-community" color="#448EE4" size={15} />
                      <Text style={{color:'gray',marginLeft:5}}>Swipe to edit/delete</Text> 
                    </View>
                  </View>
                  <View style={{backgroundColor:annotation.styles?.color,marginTop:5,marginBottom:5}}>
                  {annotation.type === 'highlight' && (
                    <TouchableOpacity style={{backgroundColor:annotation.styles?.color}}
                        onPress={() => {
 
                          goToLocation(annotation.cfiRange);
                          setModalVisible(!modalVisible);
                        }}
                        >

                      <Text
                          style={{
                            flexWrap: 'wrap',
                          }}
                          numberOfLines={4}
                        >
                          {annotation.cfiRangeText}
                        </Text>
                      </TouchableOpacity>
                    
                    )}
                  
                  </View>
              </View>
            </Swipeable> 
          </View>
        ))}
    
          </ScrollView>
          </>
          )
        
          }
          </View>
        </View>
      </Modal>
      {/* end of table of contents modal */} 
    </GestureHandlerRootView>
  );
}

export function Annotations(props:any) {

  // const {location} =props.params.location;
  const file =props.route.params.file2;
  const loc  =props.route.params.location;

  const navigation =useNavigation();
  const [theme, setTheme] = useState(false);
  const [settings, setSettings] = useState(false);

  

  return (
    <SafeAreaView>
      <ReaderProvider>
        <Book file={file} location={loc}/>
      </ReaderProvider>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
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
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height:100
},
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  roundButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginEnd:5,
    borderRadius: 20,
    backgroundColor: '#D8D9DA',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  searchIcon: {
    padding: 10,
    marginLeft:30
  },
  input: {
    width: Dimensions.get('window').width,
    height: 35,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#efefef',
    margin: 20,
    minHeight: 50,
  },
  swipedRow: {
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#818181',
    margin: 20,
    minHeight: 50,
  },
  swipedConfirmationContainer: {
    flex: 1,
  },
  deleteConfirmationText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#448EE4',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
  bookmarkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  bookmarkInfo: {
    flexDirection: 'row',
  },
  bookmarkInfoText: {
    width: '80%',
  },
  bookmarkIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkLocationNumber: {
    marginTop: -12,
  },
  tabContainerStyle: {	// the tab container
    // backgroundColor: '#D8A623',
    width: Dimensions.get('window').width*0.6, height: 'auto',
    borderRadius: 0,
  },
  contentView: {
    flexDirection:'row',
    // justifyContent: 'space-between',
    marginTop:10,
    padding:5,


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
