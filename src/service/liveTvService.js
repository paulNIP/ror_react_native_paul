import axios from 'axios';
import Strings from '../constants/Strings';



const liveTvService = async () => {
    return new Promise((resolve, reject) => {

            axios.get(Strings.API_URL+'/tv/live')
              .then((res) => {
                //console.log(res.data.TV_APP.live[0])
                resolve(res.data.TV_APP.live)
            })
              .catch((err) => {
                reject(err);
                console.log('error',err);
            });
    });
};

const rhapsodyTv = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.API_URL+'/tv')
            .then((res) => {
              //console.log(res.data.TV_APP.live[0])
              resolve(res.data.TV_APP)
          })
            .catch((err) => {
              reject(err);
              console.log('error',err);
          });
  });
};

const featuredTv = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.API_URL+'/tv/featured')
            .then((res) => {
              //console.log(res.data.TV_APP.random_videos[0])
              resolve(res.data.TV_APP.random_videos[0])
          })
            .catch((err) => {
              reject(err);
              console.log('error',err);
          });
  });
};

const getTVProgramme = async (videoid) => {
  console.log(videoid);
  return new Promise((resolve, reject) => {

          axios.get(Strings.API_URL+'/tv/'+videoid)
            .then((res) => {
              // console.log(res.data.TV_APP)
              resolve(res.data.TV_APP)
          })
            .catch((err) => {
              reject(err)
          });
  });
};
const getRelatedTVProgramme = async (videoid) => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.API_URL+'/tv/'+videoid)
            .then((res) => {
              console.log(res.data.TV_APP.related_videos)
              resolve(res.data.TV_APP.related_videos)
          })
            .catch((err) => {
              reject(err)
          });
  });
};



export { liveTvService,rhapsodyTv,featuredTv ,getTVProgramme,getRelatedTVProgramme}