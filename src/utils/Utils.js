import {Platform} from 'react-native';
import VersionCheck from 'react-native-version-check'
import DeviceInfo from 'react-native-device-info'


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




export { getOSVersion,getAppVersion,getDeviceModel}