import React,{useState} from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from '@rneui/themed';


const Controller=({ onNext, onPrv })=> {

    const [isAVisible, setAVisible] = useState(true);
    const [isBVisible, setBVisible] = useState(false);

    return (
      <View >
      <View style={styles.containerPlayer}>
        <TouchableOpacity onPress={onPrv}>
            <Icon style={{marginEnd:10, marginStart:20,marginTop:7}} name="skip-previous" type="material-community" color="white" size={45}  />
        </TouchableOpacity>
        <View >
        {isAVisible && ( 
            <TouchableOpacity onPress={()=>{setBVisible(true);setAVisible(false);}}>
                <Icon style={{marginEnd:10, marginStart:20}} name="pause-circle" type="material-community" color="white" size={60} />
            </TouchableOpacity>
             )}

             {isBVisible && (

            <TouchableOpacity onPress={()=>{setBVisible(false);setAVisible(true);}}>
                <Icon style={{marginEnd:10, marginStart:20}} name="play-circle" type="material-community" color="white" size={60} />
            </TouchableOpacity>
            )}
        </View>
        <TouchableOpacity onPress={onNext}>
            <Icon style={{marginEnd:10, marginStart:20,marginTop:7}} name="skip-next" type="material-community" color="white" size={45} />
        </TouchableOpacity>
    </View>

        
      </View>
    );
}

const styles = StyleSheet.create({

    containerPlayer:{
        flexDirection:'row',
        width:'60%',
        alignSelf:'center',
        justifyContent: "space-around",
    }
  });

export default Controller;