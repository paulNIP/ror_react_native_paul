import axios from 'axios';
import Strings from '../constants/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';



const getProfile = async (email) => {

    
  return new Promise((resolve, reject) => {

          axios.get(Strings.API_URL+'/profile/'+email)
            .then((res) => {
              // console.log(res.data);
              resolve(res.data);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getWallet = async (email) => {

  return new Promise((resolve, reject) => {

          axios.post('https://rowtoken.rhapsodyofrealities.org/api/user/check/',{
            email: email,
            password:"rabadaba"

          })
            .then((res) => {

              resolve(res.data);

          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getEnlisted = async (referenceid) => {

  return new Promise((resolve, reject) => {

          axios.post("https://rhapsodysubscriptions.org/api/admin/enlisted_users_data",{
            "ref_id": referenceid
          })
            .then((res) => {
              resolve(res.data);
              console.log("Profile ",res.data.response);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getWalletInfo = async () => {

    
  return new Promise((resolve, reject) => {

          axios.get('https://rhapsodysubscriptions.org/api/v1/wallet_info')
            .then((res) => {
              resolve(res.data);
              console.log("Wallet info uujnf",res.data);
          })
            .catch((err) => {
              reject(err)
          });
  });
};



export { getProfile,getWallet,getEnlisted,getWalletInfo}