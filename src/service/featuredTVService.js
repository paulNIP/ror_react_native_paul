
import axios from 'axios';
import Strings from '../constants/Strings';



const getFeaturedTV = async () => {
    return new Promise((resolve, reject) => {

            axios.get(Strings.API_URL+'/tv/featured')
              .then((res) => {
                // console.log("rttt",res.data.TV_APP.random_videos)
                resolve(res.data.TV_APP.random_videos)
            })
              .catch((err) => {
                reject(err)
            });
    });
};



export { getFeaturedTV }