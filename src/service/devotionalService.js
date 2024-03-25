
import axios from 'axios';
import Strings from '../constants/Strings';
import { DatabaseConnection } from '../database/database-connection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = DatabaseConnection.getdevotionalsDB();




const getDailyDevotional = async () => {
    let lang= await AsyncStorage.getItem('language');
    if(lang ===null){
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

              

    }else{

      return new Promise((resolve, reject) => {
        let url ='https://api.rorangel.com/?devotional&date='+new Date().toISOString().slice(0, 10)+'&lang='+lang;
        console.log("urlllllll",url);
        axios.get(url)
                  .then((res) => {
                    resolve(res.data.devotionals);
                    console.log("Devotional data",res.data.devotionals)
                })
                  .catch((err) => {
                    reject(err)
                });
        });


    }

};


const getArticleDetails =async (id)=>{

  return new Promise((resolve, reject) => {

    axios.get(Strings.API_URL+'/cards/'+id)
      .then((res) => {
        // console.log("Arttstyudifjn",res.data.response[0])
        resolve(res.data.response)
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

const getLanguages =async(month) => {
  //loop through getting month devotionals
  return new Promise((resolve, reject) => {
  axios.get('https://api.rorangel.com/?languages')
        .then((res) => {
          resolve(res.data);

      })
        .catch((err) => {
          reject(err)
      });
  });

}

const getPlaylist = () => {
  const currentDate =new Date().toISOString().split('T')[0];
  const selectQuery = "SELECT * FROM audio_devotionals where formated_date <= ?";
  
  
  return new Promise((resolve, reject) => {
    
    db.transaction(tx => {   
      tx.executeSql(
        selectQuery, 
        [currentDate],
        (tx, results) => {
          let files=results.rows;
          let temp =[];
          
          for(let j = 0; j < files.length; j++) {
            let item=files.item(j);
            temp.push(item);
          
          }
          resolve(files)
         }
        ,
        (_, error) => reject(error)
      );
    });

  });

};

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
     getRelatedArticles,getAudioArticles,getPlaylist,getLanguages}