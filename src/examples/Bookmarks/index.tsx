/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { SafeAreaView,Animated, useWindowDimensions,Text,View,Modal,ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { ReaderProvider, Reader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView ,Swipeable} from 'react-native-gesture-handler';
import { Header } from './Header';
import { BookmarksList } from './BookmarksList';
import { Icon } from '@rneui/themed';
import {
  Annotation,
  useReader,
} from '@epubjs-react-native/core';
import AnnotationsList from '../Annotations/AnnotationsList';
import AnnotationForm ,{ COLORS } from '../Annotations/AnnotationForm';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

export function Bookmarks() {
  const { width, height } = useWindowDimensions();
  const snapPoints = React.useMemo(() => ['50%', '75%', '100%'], []);

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const bottomSheetAnnotationRef = React.useRef<BottomSheetModal>(null);
  const bottomSheetThemeRef = React.useRef<BottomSheetModal>(null);
  const bottomSheetSearchRef = React.useRef<BottomSheetModal>(null);
  const bottomSheetFontRef = React.useRef<BottomSheetModal>(null);

  // High Lights of key documents
  const { addAnnotation, removeAnnotation, annotations,goToLocation } = useReader();

  const [selection, setSelection] = React.useState<{
    cfiRange: string;
    text: string;
  } | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = React.useState<
    Annotation | undefined
  >(undefined);
  const [tempMark, setTempMark] = React.useState<Annotation | null>(null);

  const [modalVisible, setModalVisible] = useState(false);


  interface Props {
    annotations: Annotation[];
    onClose: () => void;
  }
  
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
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <ReaderProvider>
        <Header
            onOpenBookmarksList={() => bottomSheetRef.current?.present()}
          />

          <Reader
            src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
            width={width}
            height={height * 0.8}
            fileSystem={useFileSystem}
            onAddBookmark={(bookmark) => console.log('onAddBookmark', bookmark)}
            onRemoveBookmark={(bookmark) =>
              console.log('onRemoveBookmark', bookmark)
            }
            onUpdateBookmark={(bookmark) =>
              console.log('onUpdateBookmark', bookmark)
            }
            onChangeBookmarks={(bookmarks) =>
              console.log('onChangeBookmarks', bookmarks)
            }
            enableSelection
            initialLocation="introduction_001.xhtml"
            initialAnnotations={[
              // Chapter 1
              {
                cfiRange: 'epubcfi(/6/10!/4/2/4,/1:0,/1:319)',
                data: {},
                sectionIndex: 4,
                styles: { color: '#23CE6B' },
                cfiRangeText:
                  'The pale Usher—threadbare in coat, heart, body, and brain; I see him now. He was ever dusting his old lexicons and grammars, with a queer handkerchief, mockingly embellished with all the gay flags of all the known nations of the world. He loved to dust his old grammars; it somehow mildly reminded him of his mortality.',
                type: 'highlight',
              },
              // Chapter 5
              {
                cfiRange: 'epubcfi(/6/22!/4/2/4,/1:80,/1:88)',
                data: {},
                sectionIndex: 3,
                styles: { color: '#CBA135' },
                cfiRangeText: 'landlord',
                type: 'highlight',
              },
            ]}
            onAddAnnotation={(annotation) => {
              if (annotation.type === 'highlight' && annotation.data?.isTemp) {
                setTempMark(annotation);
              }
            }}
            onPressAnnotation={(annotation) => {
              setSelectedAnnotation(annotation);
              bottomSheetRef.current?.snapToIndex(0);
            }}
            onChangeAnnotations={(annotation) => {
              console.log('onChangeAnnotations', annotation);
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
                  bottomSheetAnnotationRef.current?.snapToIndex(0);
                  return true;
                },
              }
            ]}
          />

          <BookmarksList
            ref={bottomSheetRef}
            onClose={() => bottomSheetRef.current?.dismiss()}
          />


        </ReaderProvider>


        <BottomSheet
            ref={bottomSheetAnnotationRef}
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

              <AnnotationsList
                annotations={annotations}
                onClose={() => bottomSheetRef.current?.close()}
              />
            </BottomSheetView>
          </BottomSheet>


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

      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
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
});
