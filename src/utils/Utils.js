import {Platform} from 'react-native';
import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { useState } from 'react';


const getOSVersion = async () => {
    if (Platform.OS != 'ios' ) {
        throw Error("Platform is not iOS");
    }else{
        const majorVersionIOS = parseInt(Platform.Version, 10);
        return majorVersionIOS;

    }

    
};

const getAppVersion = async () => {
    return VersionCheck.getCurrentVersion(); 
};

const getDeviceModel = async () => {
    return DeviceInfo.getModel();
};


const getStripeKeys = async () =>{

        const url = "https://backend3.rhapsodyofrealities.org/create";

        amount = String.valueOf(Integer.parseInt(amount) * 100);
        const [publishableKey, setPublishableKey] = useState();

        const data={
            currency:"usd",
            amount:amount,
            action:"one_time"
        };

        axios.post(url,data)
            .then((res) => {
              resolve(res.data);
              console.log("Stripe Payment Option",res.data);
          })
            .catch((err) => {
              reject(err)
          });

}




export { getOSVersion,getAppVersion,getDeviceModel,getStripeKeys}