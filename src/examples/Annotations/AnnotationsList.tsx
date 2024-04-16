/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Annotation, useReader } from '@epubjs-react-native/core';
import { Animated,FlatList, Text,  View,StyleSheet } from 'react-native';
import { ListItem,Button,Icon } from '@rneui/themed';
import {ScrollView, Swipeable, TouchableOpacity} from 'react-native-gesture-handler';

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
        //   Remove annotation
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

const Item = (row: IRow) => (
  <Swipeable renderRightActions={renderRightActions}>
      <View style={{marginBottom:10}} >
        <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold', marginRight:15}}>Apr 05,2024 | 0:44</Text>
          <View style={{flexDirection:'row'}}>
            <Icon name="arrow-left" type="material-community" color="#448EE4" size={15} />
            <Text style={{color:'gray',marginLeft:5}}>Swipe to edit/delete</Text> 
          </View>
        </View>
        <View style={{backgroundColor:'#0044ff'}}>
        <Text style={{flexWrap:'wrap'}} numberOfLines={3}>{row.title}</Text>
        </View>
    </View>
  </Swipeable>
);

function AnnotationsList({ annotations, onClose }: Props) {
  const { goToLocation, removeAnnotation } = useReader();

  return (
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
                          onClose();
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
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300,
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

export default AnnotationsList;
