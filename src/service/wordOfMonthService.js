
import axios from 'axios';
import Strings from '../constants/Strings';



const getWordOfMonth = async () => {
    return new Promise((resolve, reject) => {

            axios.get(Strings.API_URL+'/cards/all')
              .then((res) => {
                resolve(res.data.response)
            })
              .catch((err) => {
                reject(err)
            });
    });
};



export { getWordOfMonth }