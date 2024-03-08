import {Platform} from 'react-native';
import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { useState } from 'react';
import {
    decode,
    verify,
    isSignatureValid,
    SignJWT,
    thumbprint,
    sha256ToBase64,
    EncryptJwe,
    getRemoteJWKSet,
  } from '@pagopa/io-react-native-jwt';

import { generate, sign, getPublicKey } from '@pagopa/io-react-native-crypto';

const secretKey = 'bGS6lzFqvvSQJhdslLOxatm7/Vk7mLQyzqaS34Q4oR1ew='; // Replace with your own secret key
// const [publishableKey, setPublishableKey] = useState();


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


const getStripeKeys = async (amount) =>{

        const url = "https://backend3.rhapsodyofrealities.org/create";

        const donation_amount = (parseInt(amount) * 100).toString();
        console.log("Donational amount",donation_amount);
        

        const data={
            "currency":"usd",
            "amount":donation_amount,
            "action":"one_time"
        };

        axios.post(url,data)
            .then((res) => {
              resolve(res.data);
              console.log("Stripe Payment Option",res.data);
          })
            .catch((err) => {
              console.log("Error",err)
          });

}


export { getOSVersion,getAppVersion,getDeviceModel,getStripeKeys}