import { useEffect, useState } from "react";
import shorthash from "shorthash2";
import * as FileSystem from 'expo-file-system';
import {Image} from "react-native"

const CachedImage=(props)=>{

    const {url,style}=props;
    const [uri,setUri]=useState(null);

    useEffect(()=>{
        Cached();
    },[])

    const Cached= async()=>{
        const name= shorthash('万里长城永不倒。。。');

        const path=`${FileSystem.cacheDirectory}${name}`;

        const image =await FileSystem.getInfoAsync(path);
        if(image.exists){
            setUri(image.uri);
            return;
        }

        const newImage= await FileSystem.downloadAsync(url,path);
        setUri(newImage,uri)

        
    };
    return <Image style={style} source={{uri:url}}/>


};
export default CachedImage;