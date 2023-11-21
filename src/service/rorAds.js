
import axios from 'axios';
import Strings from '../constants/Strings';



const rorAds = async () => {
    return new Promise((resolve, reject) => {

            axios.get(Strings.API_URL+'/ads/status/active')
              .then((res) => {
                //console.log(res.data.ror_ads);
                resolve(res.data.ror_ads);
            })
              .catch((err) => {
                reject(err)
            });
    });
};



export { rorAds }