
import axios from 'axios';
import Strings from '../constants/Strings';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getdevotionalsDB();



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
     getRelatedArticles,getAudioArticles,getPlaylist}