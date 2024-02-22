
import axios from 'axios';
import Strings from '../constants/Strings';



const getDailyDevotional = async () => {
    return new Promise((resolve, reject) => {

            axios.post(Strings.API_URL+'/v2/devotional', {
                date: new Date().toISOString().slice(0, 10)

              })
              .then((res) => {
                //console.log(res.data.result)
                resolve(res.data.result);
                console.log("Devotional data",res.data.result)
            })
              .catch((err) => {
                reject(err)
            });
    });
};


const getArticleDetails =async (date)=>{

  return new Promise((resolve, reject) => {

    axios.post(Strings.API_URL+'/devotional', {
        date: date

      })
      .then((res) => {
        //console.log(res.data.result)
        resolve(res.data.result)
    })
      .catch((err) => {
        reject(err)
    });
});

}


const getPastArticles =async() => {
  return new Promise((resolve, reject) => {

    axios.get(Strings.API_URL+'/last/devotionals')
      .then((res) => {
        resolve(res.data.response)
    })
      .catch((err) => {
        reject(err)
    });
});
}

const getAudioArticles =async(month) => {
    //loop through getting month devotionals
    return new Promise((resolve, reject) => {
    axios.get(Strings.API_URL+'/audio/english/'+month)
        .then((res) => {
          resolve(res.data);


      })
        .catch((err) => {
          reject(err)
      });
  });

  

}

const getRelatedArticles =async(title) => {
  return new Promise((resolve, reject) => {

    axios.post(Strings.API_URL+'/related/articles', {
        query: title

      })
      .then((res) => {
        //console.log(res.data.result)
        resolve(res.data.result)
    })
      .catch((err) => {
        reject(err)
    });
});

}



export { getDailyDevotional ,getArticleDetails,getPastArticles,
     getRelatedArticles,getAudioArticles}