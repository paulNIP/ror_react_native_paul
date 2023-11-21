
import axios from 'axios';
import Strings from '../constants/Strings';



const getDailyQuiz = async () => {
    return new Promise((resolve, reject) => {

            axios.get(Strings.API_URL+'/question/'+new Date().toISOString().slice(0, 10))
              .then((res) => {
                console.log(res.data.response)
                resolve(res.data.response)
            })
              .catch((err) => {
                reject(err)
            });
    });
};



export { getDailyQuiz }