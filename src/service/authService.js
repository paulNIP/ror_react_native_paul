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
              console.log("Profile ",res.data);
          })
            .catch((err) => {
              reject(err)
          });
  });
};



export { getProfile,getWallet}